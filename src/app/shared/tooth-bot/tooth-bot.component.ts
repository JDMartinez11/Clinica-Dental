import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type FontSizeMode = 'small' | 'normal' | 'big';

@Component({
  selector: 'app-tooth-bot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooth-bot.component.html',
  styleUrls: ['./tooth-bot.component.scss']
})
export class ToothBotComponent {
  open = false;
  private fontMode: FontSizeMode = 'normal';

  toggle() {
    this.open = !this.open;
  }

  // ---- Tamaño de texto ----
  setFontSize(mode: FontSizeMode) {
    this.fontMode = mode;
    document.body.classList.remove('font-small', 'font-normal', 'font-big');

    const cls =
      mode === 'small' ? 'font-small' :
      mode === 'big'   ? 'font-big'   :
                         'font-normal';

    document.body.classList.add(cls);
  }

  // ---- Alto contraste ----
  toggleContrast() {
    document.body.classList.toggle('high-contrast');
  }

  // ---- Reducir movimiento ----
  toggleReduceMotion() {
    document.body.classList.toggle('reduced-motion');
  }

  // ---- Resaltar enlaces ----
  toggleHighlightLinks() {
    document.body.classList.toggle('highlight-links');
  }

  // ---- Ir arriba ----
  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---- Reset ----
  resetAll() {
    document.body.classList.remove(
      'font-small',
      'font-normal',
      'font-big',
      'high-contrast',
      'reduced-motion',
      'highlight-links'
    );
    this.fontMode = 'normal';
  }
}
