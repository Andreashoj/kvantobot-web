# KvantoBot Web Frontend

## 🏗️ Architecture Overview

This is the **Angular frontend** for the KvantoBot ecosystem, providing a web-based dashboard and user interface for Discord bot management and user authentication.

### Tech Stack
- **Angular 20+** with standalone components and signals
- **Tailwind CSS** for styling
- **TypeScript** with strict typing
- **Netlify** for hosting and deployment

## 🌐 Live URLs

- **Production**: https://kvantobot-web.netlify.app
- **API Backend**: https://kvantobot-api.azurewebsites.net
- **Repository**: https://github.com/Andreashoj/kvantobot-web

## 🔗 System Integration

### 1. **Frontend ↔ Backend Communication**
```typescript
// Production Environment Configuration
export const environment = {
  production: true,
  discord: {
    clientId: '1419232209528688650',
    redirectUri: 'https://kvantobot-web.netlify.app/auth/callback',
    scope: 'identify email'
  },
  backend: {
    url: 'https://kvantobot-api.azurewebsites.net/api'
  }
};
```

### 2. **Discord OAuth Flow**
```
User clicks "Login with Discord" 
→ Frontend redirects to Discord OAuth 
→ Discord redirects to /auth/callback with code
→ Frontend sends code to Backend API
→ Backend exchanges code for Discord user info
→ User authenticated and redirected to dashboard
```

### 3. **Architecture Diagram**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Angular Web   │───▶│   Node.js API   │───▶│  Discord OAuth  │
│   (Netlify)     │    │    (Azure)      │    │   & Bot Data    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                    ┌─────────────────┐
                    │  Discord Bot    │
                    │   (Separate)    │
                    └─────────────────┘
```

## 📁 Project Structure

```
src/
├── app/
│   ├── core/               # Core services and utilities
│   │   └── services/
│   │       └── discord-auth.service.ts
│   ├── features/           # Feature modules
│   │   ├── auth/          # Authentication components
│   │   │   ├── login.component.ts
│   │   │   └── callback.component.ts
│   │   └── dashboard/     # Dashboard components
│   │       └── dashboard.component.ts
│   ├── shared/            # Shared components (future)
│   ├── app.config.ts      # App configuration
│   ├── app.routes.ts      # Routing configuration
│   └── app.ts            # Root component
├── environments/          # Environment configurations
│   ├── environment.ts     # Development
│   └── environment.prod.ts # Production
└── styles.css            # Global styles with Tailwind
```

## 🔧 Key Components

### **Discord Auth Service**
- Handles Discord OAuth 2.0 flow
- Uses Angular signals for reactive state management
- Communicates with backend API for token exchange
- Stores authentication state

### **Login Component**
- Initiates Discord OAuth flow
- Redirects users to Discord authorization

### **Callback Component**
- Handles OAuth callback from Discord
- Exchanges authorization code for user data
- Redirects to dashboard on success

### **Dashboard Component**
- Protected route requiring authentication
- Displays user information and bot controls
- Future: Bot management features

## 🚀 Deployment Pipeline

### **GitHub Actions → Netlify**
```yaml
name: Deploy to Netlify
on:
  push:
    branches: [ main ]

# Automatic deployment process:
# 1. Checkout code
# 2. Setup Node.js 20
# 3. Install dependencies (npm ci --include=dev)
# 4. Build Angular app (npm run build)
# 5. Deploy to Netlify (production environment)
```

### **Build Configuration**
- **netlify.toml** configures automatic deployment
- **Angular production build** uses environment.prod.ts
- **Tailwind CSS** compiled and optimized
- **Assets optimized** and served via CDN

## 🔐 Environment Configuration

### **Development**
```typescript
// src/environments/environment.ts
backend: { url: 'http://localhost:3001/api' }
redirectUri: 'http://localhost:4200/auth/callback'
```

### **Production**
```typescript
// src/environments/environment.prod.ts
backend: { url: 'https://kvantobot-api.azurewebsites.net/api' }
redirectUri: 'https://kvantobot-web.netlify.app/auth/callback'
```

## 🤖 Integration with KvantoBot Ecosystem

### **1. User Authentication**
- Web users authenticate via Discord OAuth
- Same Discord users as the bot serves
- Unified user experience across bot and web

### **2. Bot Management (Future)**
- Web dashboard will provide bot controls
- View bot statistics and logs
- Configure bot settings
- Manage Discord server integrations

### **3. Data Sharing**
- Backend API serves both web and bot
- Shared user data and preferences
- Consistent state across platforms

## 🔄 Development Workflow

### **Local Development**
```bash
# Start development server
npm install
npm start
# → Runs on http://localhost:4200

# Build for production
npm run build
# → Outputs to dist/kvantobot-web/browser/
```

### **Deployment**
```bash
# Automatic via pipeline
git add .
git commit -m "feat: your changes"
git push origin main
# → Triggers automatic deployment to Netlify
```

## 🔗 Related Components

### **Backend API** (`kvantobot-api`)
- Handles Discord OAuth token exchange
- Provides bot data and management endpoints
- Deployed on Azure App Service
- Repository: https://github.com/Andreashoj/kvantobot-api

### **Discord Bot** (`Kvantobot2`)
- Runs independently on server/local
- Provides Discord bot functionality
- Can share data via backend API
- Repository: Local project (not web-integrated)

## 🛡️ Security Features

- **HTTPS everywhere** in production
- **CORS configured** for backend communication
- **Discord OAuth 2.0** for secure authentication
- **No secrets in frontend** (only public client ID)
- **Environment-based configuration** for security

## 📝 Future Enhancements

- **Bot Management Dashboard**: Control bot from web
- **Server Statistics**: View Discord server analytics  
- **User Preferences**: Customize bot behavior per user
- **Real-time Updates**: WebSocket integration with bot
- **Admin Controls**: Manage bot permissions and settings

---

*This frontend is part of the KvantoBot ecosystem, providing a modern web interface for Discord bot interaction and management.*