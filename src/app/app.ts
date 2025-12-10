import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';   // 👈 sin .component
import { FooterComponent } from './shared/footer/footer';   // 👈 sin .component
import { ToothBotComponent } from './shared/tooth-bot/tooth-bot.component'; 
@Component({
 selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink, 
    RouterLinkActive,
    NavbarComponent,
    ToothBotComponent 
    
  ],
  template: `
    <div class="app-root">
      <app-navbar></app-navbar>  <!-- 👈 AQUÍ VA TU NAVBAR -->

      <main class="app-main">
        <section class="app-content">
          <router-outlet></router-outlet>
        </section>
      </main>
       <app-tooth-bot></app-tooth-bot>
    </div>
  `
})

export class App {}
