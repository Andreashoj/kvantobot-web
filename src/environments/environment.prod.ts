export const environment = {
  production: true,
  discord: {
    clientId: '1419232209528688650',
    redirectUri: 'https://kvantobot-web.netlify.app/auth/callback', // Update this with your actual Netlify URL
    scope: 'identify email'
  },
  backend: {
    url: 'https://your-api-app.azurewebsites.net/api' // Update this with your actual Azure URL
  }
};