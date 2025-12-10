import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tooth {
  x: number;
  y: number;
  radius: number;
}

@Component({
  selector: 'app-brushing-game',
  standalone: true,
  templateUrl: './brushing-game.html',
  styleUrls: ['./brushing-game.scss'],
  imports: [CommonModule]
})
export class BrushingGameComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('teethContainer') teethContainer!: ElementRef<HTMLDivElement>;

  score = 0;
  timer = 30;
  private intervalId: any;
  teeth: Tooth[] = [];
  gameOver = false;

  ngOnInit(): void {
    // Esperamos a AfterViewInit para tener el tamaño real del contenedor
  }

  ngAfterViewInit(): void {
    this.resetBoard();
    this.startTimer();
  }

  private resetBoard(): void {
    this.teeth = [];
    this.generateTeeth();
  }

  private generateTeeth(): void {
    const container = this.teethContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const radius = 30;
    const margin = 8;

    this.teeth = [];

    for (let i = 0; i < 5; i++) {
      const x = Math.random() * (width - 2 * radius - margin * 2) + margin;
      const y = Math.random() * (height - 2 * radius - margin * 2) + margin;

      this.teeth.push({ x, y, radius });
    }
  }

  brushTooth(): void {
    if (this.gameOver) return;
    this.score++;
    this.resetBoard();
  }

  private startTimer(): void {
    this.clearTimer();

    this.timer = 30;
    this.gameOver = false;

    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.gameOver = true;
        this.clearTimer();
        alert(`¡Tiempo agotado! Tu puntuación final es: ${this.score}`);
        this.showDentalInfo();
      }
    }, 1000);
  }

  private clearTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private showDentalInfo(): void {
    alert(
      '¡Felicitaciones por jugar! Aquí tienes un dato sobre odontología:\n\n' +
        'El cepillado regular de tus dientes es esencial para mantener una buena salud bucal. ' +
        'Cepíllate al menos dos veces al día durante 2 minutos, ' +
        'y visita a tu dentista regularmente para prevenir problemas dentales.'
    );
  }

  resetGame(): void {
    this.score = 0;
    this.timer = 30;
    this.gameOver = false;
    this.resetBoard();
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }
}
