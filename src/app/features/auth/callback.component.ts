import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscordAuthService } from '../../core/services/discord-auth.service';

@Component({
  selector: 'app-callback',
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-kvanto-900 via-kvanto-800 to-kvanto-700 flex items-center justify-center p-4">
      <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 max-w-md w-full text-center">
        @if (isProcessing) {
          <div class="flex flex-col items-center space-y-4">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <h2 class="text-2xl font-semibold text-white">Completing Login...</h2>
            <p class="text-kvanto-50/80">Please wait while we authenticate your Discord account.</p>
          </div>
        } @else if (hasError) {
          <div class="flex flex-col items-center space-y-4">
            <div class="text-red-400 text-5xl">❌</div>
            <h2 class="text-2xl font-semibold text-white">Authentication Failed</h2>
            <p class="text-kvanto-50/80">{{ errorMessage }}</p>
            <button 
              (click)="goToLogin()"
              class="bg-kvanto-600 hover:bg-kvanto-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        }
      </div>
    </div>
  `
})
export class CallbackComponent implements OnInit {
  private readonly authService = inject(DiscordAuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  
  isProcessing = true;
  hasError = false;
  errorMessage = '';
  
  async ngOnInit(): Promise<void> {
    try {
      // Get the authorization code from URL params
      const code = this.route.snapshot.queryParamMap.get('code');
      const error = this.route.snapshot.queryParamMap.get('error');
      
      if (error) {
        throw new Error(`Discord OAuth error: ${error}`);
      }
      
      if (!code) {
        throw new Error('No authorization code received');
      }
      
      // Handle the OAuth callback
      await this.authService.handleCallback(code);
      
      // Redirect to dashboard on success
      await this.router.navigate(['/dashboard']);
      
    } catch (error) {
      console.error('OAuth callback error:', error);
      this.isProcessing = false;
      this.hasError = true;
      this.errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    }
  }
  
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}