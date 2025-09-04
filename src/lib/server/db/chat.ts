// src/lib/server/db/chat.ts

import { db } from './index';
import { chatSessions, chatMessages, chatAnalytics } from './schema';
import { eq, desc, and, count } from 'drizzle-orm';
import type { Message } from 'ai';

export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  tokens?: number;
  createdAt: Date;
}

export interface ChatAnalytics {
  id: string;
  userId: string;
  sessionId: string;
  messageCount: number;
  totalTokens: number;
  duration?: number;
  createdAt: Date;
}

// Create a new chat session
export async function createChatSession(userId: string, title?: string): Promise<ChatSession> {
  const [session] = await db.insert(chatSessions).values({
    userId,
    title: title || 'New Chat',
    isActive: true
  }).returning();

  return session;
}

// Get user's chat sessions
export async function getUserChatSessions(userId: string, limit: number = 20): Promise<ChatSession[]> {
  return await db
    .select()
    .from(chatSessions)
    .where(and(eq(chatSessions.userId, userId), eq(chatSessions.isActive, true)))
    .orderBy(desc(chatSessions.updatedAt))
    .limit(limit);
}

// Get a specific chat session
export async function getChatSession(sessionId: string, userId: string): Promise<ChatSession | null> {
  const [session] = await db
    .select()
    .from(chatSessions)
    .where(and(eq(chatSessions.id, sessionId), eq(chatSessions.userId, userId)))
    .limit(1);

  return session || null;
}

// Update chat session
export async function updateChatSession(sessionId: string, updates: Partial<ChatSession>): Promise<void> {
  await db
    .update(chatSessions)
    .set({
      ...updates,
      updatedAt: new Date()
    })
    .where(eq(chatSessions.id, sessionId));
}

// Delete chat session (soft delete)
export async function deleteChatSession(sessionId: string, userId: string): Promise<void> {
  await db
    .update(chatSessions)
    .set({ isActive: false })
    .where(and(eq(chatSessions.id, sessionId), eq(chatSessions.userId, userId)));
}

// Save a message to the database
export async function saveChatMessage(
  sessionId: string,
  role: 'user' | 'assistant' | 'system',
  content: string,
  tokens?: number
): Promise<ChatMessage> {
  const [message] = await db.insert(chatMessages).values({
    sessionId,
    role,
    content,
    tokens
  }).returning();

  // Update session's updatedAt timestamp
  await updateChatSession(sessionId, {});

  return message;
}

// Get messages for a chat session
export async function getChatMessages(sessionId: string, limit: number = 50): Promise<ChatMessage[]> {
  return await db
    .select()
    .from(chatMessages)
    .where(eq(chatMessages.sessionId, sessionId))
    .orderBy(chatMessages.createdAt)
    .limit(limit);
}

// Convert database messages to AI SDK format
export function convertToAIMessages(dbMessages: ChatMessage[]): Message[] {
  return dbMessages.map(msg => ({
    id: msg.id,
    role: msg.role,
    content: msg.content
  }));
}

// Get or create active session for user
export async function getOrCreateActiveSession(userId: string): Promise<ChatSession> {
  // Try to get the most recent active session
  const [existingSession] = await db
    .select()
    .from(chatSessions)
    .where(and(eq(chatSessions.userId, userId), eq(chatSessions.isActive, true)))
    .orderBy(desc(chatSessions.updatedAt))
    .limit(1);

  if (existingSession) {
    return existingSession;
  }

  // Create new session if none exists
  return await createChatSession(userId);
}

// Save chat analytics
export async function saveChatAnalytics(
  userId: string,
  sessionId: string,
  messageCount: number,
  totalTokens: number,
  duration?: number
): Promise<void> {
  await db.insert(chatAnalytics).values({
    userId,
    sessionId,
    messageCount,
    totalTokens,
    duration
  });
}

// Get user's chat statistics
export async function getUserChatStats(userId: string): Promise<{
  totalSessions: number;
  totalMessages: number;
  totalTokens: number;
  averageSessionDuration: number;
}> {
  const [sessionCount] = await db
    .select({ count: count() })
    .from(chatSessions)
    .where(and(eq(chatSessions.userId, userId), eq(chatSessions.isActive, true)));

  const [messageStats] = await db
    .select({
      totalMessages: count(chatMessages.id),
      totalTokens: count(chatMessages.tokens)
    })
    .from(chatMessages)
    .innerJoin(chatSessions, eq(chatMessages.sessionId, chatSessions.id))
    .where(eq(chatSessions.userId, userId));

  const [durationStats] = await db
    .select({
      avgDuration: count(chatAnalytics.duration)
    })
    .from(chatAnalytics)
    .where(eq(chatAnalytics.userId, userId));

  return {
    totalSessions: sessionCount.count,
    totalMessages: messageStats.totalMessages,
    totalTokens: messageStats.totalTokens,
    averageSessionDuration: durationStats.avgDuration || 0
  };
}

// Clean up old inactive sessions (for maintenance)
export async function cleanupOldSessions(daysOld: number = 30): Promise<void> {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  await db
    .update(chatSessions)
    .set({ isActive: false })
    .where(and(
      eq(chatSessions.isActive, true),
      // Add date comparison when needed
    ));
}
