import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brushing-game',
  templateUrl: './brushing-game.html',
  styleUrls: ['./brushing-game.scss'],  // Cambié la ruta aquí a .scss
  imports: [CommonModule]  // Asegúrate de tener esto para *ngFor y *ngIf
})
export class BrushingGameComponent implements OnInit, OnDestroy {
  score = 0;
  timer = 30;
  interval: any;
  teeth: any[] = [];
  gameOver = false;

  ngOnInit() {
    this.generateTeeth();
    this.startTimer();
  }

  generateTeeth() {
    for (let i = 0; i < 5; i++) {
      const xPosition = Math.random() * (window.innerWidth - 100);
      const yPosition = Math.random() * (window.innerHeight - 100);
      this.teeth.push({
        x: xPosition,
        y: yPosition,
        radius: 30
      });
    }
  }

  brushTooth() {
    if (this.gameOver) return;
    this.score++;
    this.teeth = [];
    this.generateTeeth();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval);
        this.gameOver = true;
        alert(`¡Tiempo agotado! Tu puntuación final es: ${this.score}`);
        this.showDentalInfo();
      }
    }, 1000);
  }

  showDentalInfo() {
    alert("¡Felicitaciones por jugar! Aquí tienes un dato sobre odontología:\n\n" +
          "El cepillado regular de tus dientes es esencial para mantener una buena salud bucal. " +
          "Asegúrate de cepillarte al menos dos veces al día durante 2 minutos, " +
          "y no olvides visitar al dentista regularmente para prevenir problemas dentales.");
  }

  resetGame() {
    this.score = 0;
    this.timer = 30;
    this.teeth = [];
    this.gameOver = false;
    this.generateTeeth();
    clearInterval(this.interval);
    this.startTimer();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
