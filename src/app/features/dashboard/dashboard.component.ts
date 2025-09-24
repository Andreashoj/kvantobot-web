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
              <h1 class="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                Kvantos Paradise
              </h1>
            </div>
            
            <div class="flex items-center space-x-4">
              @if (user(); as userInfo) {
                <div class="flex items-center space-x-3">
                  @if (avatarUrl()) {
                    <img [src]="avatarUrl()" [alt]="displayName()" class="w-8 h-8 rounded-full">
                  }
                  <span class="text-white font-medium">{{ displayName() }}</span>
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
            <h2 class="text-3xl font-semibold text-white mb-4">
              Welcome to the paradise, <span class="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">{{ displayName() }}</span>!
            </h2>
            <p class="text-kvanto-50/80 mb-4 text-lg">
              Step into the ultimate gambling experience. Your fortune awaits in the games ahead.
            </p>
            
            <!-- User Info Card -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-black/20 rounded-xl p-4 border border-amber-500/20">
                <h3 class="text-lg font-semibold text-amber-300 mb-2">Player Profile</h3>
                <div class="space-y-2">
                  <p class="text-kvanto-50/80"><span class="font-medium">Discord ID:</span> {{ userInfo.id }}</p>
                  @if (userInfo.global_name) {
                    <p class="text-kvanto-50/80"><span class="font-medium">Display Name:</span> {{ userInfo.global_name }}</p>
                  }
                  <p class="text-kvanto-50/80"><span class="font-medium">Username:</span> {{ userInfo.username }}</p>
                  @if (userInfo.email) {
                    <p class="text-kvanto-50/80"><span class="font-medium">Email:</span> {{ userInfo.email }}</p>
                  }
                </div>
              </div>
              
              <div class="bg-black/20 rounded-xl p-4 border border-amber-500/20">
                <h3 class="text-lg font-semibold text-amber-300 mb-2">Casino Stats</h3>
                <div class="space-y-2">
                  <p class="text-kvanto-50/80"><span class="font-medium text-yellow-400">Kvanto Coins:</span> Loading...</p>
                  <p class="text-kvanto-50/80"><span class="font-medium text-yellow-400">House Rank:</span> Loading...</p>
                  <p class="text-kvanto-50/80"><span class="font-medium text-yellow-400">Games Played:</span> Loading...</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Casino Games Section -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-amber-500/30">
            <h3 class="text-2xl font-semibold text-amber-300 mb-6 text-center">The House Always Has More</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-black/30 rounded-lg p-6 text-center border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
                <div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center text-black font-bold text-xl">$</div>
                <h4 class="font-semibold text-white text-lg mb-2">Live Casino</h4>
                <p class="text-sm text-kvanto-50/80">Place your bets directly from paradise</p>
              </div>
              
              <div class="bg-black/30 rounded-lg p-6 text-center border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
                <div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center text-black font-bold text-xl">%</div>
                <h4 class="font-semibold text-white text-lg mb-2">Fortune Analytics</h4>
                <p class="text-sm text-kvanto-50/80">Track your wins and losses in style</p>
              </div>
              
              <div class="bg-black/30 rounded-lg p-6 text-center border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
                <div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center text-black font-bold text-xl">#</div>
                <h4 class="font-semibold text-white text-lg mb-2">High Rollers</h4>
                <p class="text-sm text-kvanto-50/80">See who rules the paradise</p>
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
  
  protected readonly displayName = computed(() => {
    const currentUser = this.user();
    // Prefer display name (global_name) over username, fallback to username if no display name
    return currentUser?.global_name || currentUser?.username || 'Unknown User';
  });
  
  logout(): void {
    this.authService.logout();
    // Router navigation will be handled by auth guard redirect
  }
}