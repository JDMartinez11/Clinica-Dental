// src/app/pages/no-autorizado/no-autorizado.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-no-autorizado',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Acceso no autorizado</h2>
      <p>No tienes permisos para entrar en esta sección.</p>
    </div>
  `,
  styles: [`
    .container {
      padding: 40px;
      text-align: center;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
  `]
})
export class NoAutorizadoComponent {}
