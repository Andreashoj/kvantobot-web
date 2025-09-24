import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface DiscordUser {
  id: string;
  username: string;
  global_name?: string; // Display name (preferred over username)
  discriminator: string;
  avatar: string | null;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DiscordAuthService {
  private readonly http = inject(HttpClient);
  
  // Discord OAuth configuration
  private readonly clientId = environment.discord.clientId;
  private readonly redirectUri = environment.discord.redirectUri;
  private readonly scope = environment.discord.scope;
  private readonly backendUrl = environment.backend.url;
  
  // Reactive state using signals
  private readonly _currentUser = signal<DiscordUser | null>(null);
  private readonly _isAuthenticated = signal<boolean>(false);
  private readonly _isLoading = signal<boolean>(false);
  
  // Public readonly signals
  currentUser = this._currentUser.asReadonly();
  isAuthenticated = this._isAuthenticated.asReadonly();
  isLoading = this._isLoading.asReadonly();
  
  constructor() {
    // Check for existing token on service initialization
    this.checkExistingAuth();
  }
  
  /**
   * Start Discord OAuth flow by redirecting to Discord authorization URL
   */
  login(): void {
    const authUrl = this.buildAuthUrl();
    window.location.href = authUrl;
  }
  
  /**
   * Handle the OAuth callback and exchange code for access token
   */
  async handleCallback(code: string): Promise<void> {
    this._isLoading.set(true);
    
    try {
      // Exchange authorization code for access token
      const response = await this.exchangeCodeForToken(code);
      
      if (response.access_token && response.user) {
        // Store token securely
        localStorage.setItem('discord_access_token', response.access_token);
        
        // Update state with user info from backend response
        this._currentUser.set(response.user);
        this._isAuthenticated.set(true);
      }
    } catch (error) {
      console.error('Discord OAuth error:', error);
      this.logout();
    } finally {
      this._isLoading.set(false);
    }
  }
  
  /**
   * Log out user and clear stored data
   */
  logout(): void {
    localStorage.removeItem('discord_access_token');
    this._currentUser.set(null);
    this._isAuthenticated.set(false);
  }
  
  /**
   * Check if user is already authenticated on service initialization
   */
  private async checkExistingAuth(): Promise<void> {
    const token = localStorage.getItem('discord_access_token');
    
    if (token) {
      try {
        this._isLoading.set(true);
        const user = await this.fetchUserInfo(token);
        this._currentUser.set(user);
        this._isAuthenticated.set(true);
      } catch (error) {
        // Token might be expired, remove it
        this.logout();
      } finally {
        this._isLoading.set(false);
      }
    }
  }
  
  /**
   * Build Discord OAuth authorization URL
   */
  private buildAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: this.scope
    });
    
    return `https://discord.com/api/oauth2/authorize?${params.toString()}`;
  }
  
  /**
   * Exchange authorization code for access token using our backend
   */
  private async exchangeCodeForToken(code: string): Promise<any> {
    return this.http.post(`${this.backendUrl}/auth/discord/callback`, { code }).toPromise();
  }
  
  /**
   * Fetch user information from Discord API
   */
  private async fetchUserInfo(accessToken: string): Promise<DiscordUser> {
    const response = await this.http.get<DiscordUser>('https://discord.com/api/v10/users/@me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).toPromise();
    
    if (!response) {
      throw new Error('Failed to fetch user info');
    }
    
    return response;
  }
}