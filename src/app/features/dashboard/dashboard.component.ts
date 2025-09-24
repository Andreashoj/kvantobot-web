import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscordAuthService } from '../../core/services/discord-auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-kvanto-900 via-kvanto-800 to-kvanto-700">
      <!-- Header -->
      <header class="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-4">
            <div class="flex items-center space-x-3">
              <h1 class="text-2xl font-bold text-white">🎰 KvantoBot Dashboard</h1>
            </div>
            
            <div class="flex items-center space-x-4">
              @if (user(); as userInfo) {
                <div class="flex items-center space-x-3">
                  @if (avatarUrl()) {
                    <img [src]="avatarUrl()" [alt]="userInfo.username" class="w-8 h-8 rounded-full">
                  }
                  <span class="text-white font-medium">{{ userInfo.username }}</span>
                </div>
              }
              
              <button 
                (click)="logout()"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        @if (user(); as userInfo) {
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 mb-8">
            <h2 class="text-2xl font-semibold text-white mb-4">Welcome, {{ userInfo.username }}! 👋</h2>
            <p class="text-kvanto-50/80 mb-4">
              Your gamba stats and leaderboard will appear here soon. The backend integration is coming next!
            </p>
            
            <!-- User Info Card -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-black/20 rounded-xl p-4">
                <h3 class="text-lg font-semibold text-white mb-2">Account Info</h3>
                <div class="space-y-2">
                  <p class="text-kvanto-50/80"><span class="font-medium">Discord ID:</span> {{ userInfo.id }}</p>
                  <p class="text-kvanto-50/80"><span class="font-medium">Username:</span> {{ userInfo.username }}</p>
                  @if (userInfo.email) {
                    <p class="text-kvanto-50/80"><span class="font-medium">Email:</span> {{ userInfo.email }}</p>
                  }
                </div>
              </div>
              
              <div class="bg-black/20 rounded-xl p-4">
                <h3 class="text-lg font-semibold text-white mb-2">Gamba Stats</h3>
                <div class="space-y-2">
                  <p class="text-kvanto-50/80">🎰 <span class="font-medium">Current Balance:</span> Loading...</p>
                  <p class="text-kvanto-50/80">🏆 <span class="font-medium">Leaderboard Rank:</span> Loading...</p>
                  <p class="text-kvanto-50/80">📊 <span class="font-medium">Total Games:</span> Loading...</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Coming Soon Section -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
            <h3 class="text-xl font-semibold text-white mb-4">🚧 Coming Soon</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-black/20 rounded-lg p-4 text-center">
                <div class="text-3xl mb-2">🎰</div>
                <h4 class="font-semibold text-white">Live Gambling</h4>
                <p class="text-sm text-kvanto-50/80">Gamble directly from the web</p>
              </div>
              
              <div class="bg-black/20 rounded-lg p-4 text-center">
                <div class="text-3xl mb-2">📊</div>
                <h4 class="font-semibold text-white">Detailed Stats</h4>
                <p class="text-sm text-kvanto-50/80">View your gambling history</p>
              </div>
              
              <div class="bg-black/20 rounded-lg p-4 text-center">
                <div class="text-3xl mb-2">🏆</div>
                <h4 class="font-semibold text-white">Leaderboards</h4>
                <p class="text-sm text-kvanto-50/80">See who's winning big</p>
              </div>
            </div>
          </div>
        } @else {
          <div class="text-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
            <p class="text-white mt-4">Loading user data...</p>
          </div>
        }
      </main>
    </div>
  `
})
export class DashboardComponent {
  private readonly authService = inject(DiscordAuthService);
  
  protected readonly user = this.authService.currentUser;
  
  protected readonly avatarUrl = computed(() => {
    const currentUser = this.user();
    if (currentUser?.avatar) {
      return `https://cdn.discordapp.com/avatars/${currentUser.id}/${currentUser.avatar}.png`;
    }
    return null;
  });
  
  logout(): void {
    this.authService.logout();
    // Router navigation will be handled by auth guard redirect
  }
}