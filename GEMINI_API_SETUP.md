# 🔑 Gemini API Key Setup Guide

## ⚠️ **IMPORTANT: AI Chat Requires API Key Configuration**

Your AI Chat feature is currently showing an error because the **GEMINI_API_KEY** is not configured. Follow these steps to set it up:

## 📋 **Step-by-Step Setup:**

### **1. Get Your Gemini API Key**

1. **Visit Google AI Studio**: Go to [https://aistudio.google.com/](https://aistudio.google.com/)
2. **Sign in** with your Google account
3. **Create a new API key**:
   - Click on "Get API Key" 
   - Select "Create API Key in new project" or use existing project
   - Copy the generated API key

### **2. Configure Your .env File**

1. **Open your `.env` file** in the project root directory
2. **Add or update** the GEMINI_API_KEY line:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:12345678@localhost:5434/my_authentication_db"
AUTH_SECRET="your-super-secret-auth-key-here-minimum-32-characters-long"

# AI Chat Configuration
GEMINI_API_KEY="your-actual-gemini-api-key-here"
```

### **3. Replace the Placeholder**

- **Replace** `"your-actual-gemini-api-key-here"` with your actual API key
- **Keep the quotes** around the API key
- **Example**:
  ```env
  GEMINI_API_KEY="AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  ```

### **4. Restart the Development Server**

After updating the `.env` file:

1. **Stop** the current dev server (Ctrl+C in terminal)
2. **Restart** the server:
   ```bash
   npm run dev
   ```

## ✅ **Verification Steps:**

1. **Navigate to** `/chat` in your browser
2. **Try sending a message** like "Hello"
3. **You should see** the AI response instead of the error message

## 🔒 **Security Notes:**

- **Never commit** your `.env` file to version control
- **Keep your API key private** - don't share it publicly
- **The `.env` file is already in `.gitignore`** for security

## 🆘 **Troubleshooting:**

### **Error: "AI service not configured"**
- ✅ Check that GEMINI_API_KEY is set in `.env`
- ✅ Verify the API key is valid and active
- ✅ Restart the development server after changes

### **Error: "Failed to process chat request"**
- ✅ Verify your API key has proper permissions
- ✅ Check your internet connection
- ✅ Ensure you have sufficient API quota

### **Error: "Unauthorized"**
- ✅ Make sure you're logged in to the application
- ✅ Try logging out and logging back in

## 💡 **API Key Management:**

- **Free Tier**: Google provides free usage for Gemini API
- **Rate Limits**: Be aware of API rate limits for production use
- **Monitoring**: Monitor your API usage in Google AI Studio

## 🎯 **Expected Result:**

Once configured correctly, your AI Chat will:
- ✅ **Respond to messages** with intelligent AI-generated content
- ✅ **Save all conversations** to your database
- ✅ **Provide session management** for organizing chats
- ✅ **Show usage statistics** in the dashboard

---

**Need Help?** If you continue to experience issues, check the browser console for detailed error messages or contact support.
