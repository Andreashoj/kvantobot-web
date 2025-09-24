# KvantoBot Web

Modern Angular web application for KvantoBot with Discord OAuth authentication and bot management features.

## Features

- Discord OAuth 2.0 authentication
- Modern Angular 20+ with standalone components
- Tailwind CSS for styling
- Signal-based reactive state management
- TypeScript with strict typing
- Responsive design

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
Update `src/environments/environment.ts` with your Discord OAuth credentials.

3. Start development server:
```bash
npm start
```

The app will be available at `http://localhost:4200/`

## Building for Production

```bash
npm run build
```

Builds are optimized and ready for deployment to Netlify.

## Project Structure

- `src/app/core/` - Core services and utilities
- `src/app/features/` - Feature modules (auth, dashboard)
- `src/app/shared/` - Shared components and utilities
- `src/environments/` - Environment configurations

## Deployment

This application is configured for deployment to Netlify with automatic builds from the main branch.

## Architecture

Built following Angular best practices:
- Smart/Dumb component pattern
- Signal-based state management
- OnPush change detection
- Clean architecture with separation of concerns
