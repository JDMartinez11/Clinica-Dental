import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { CommonModule } from '@angular/common'; // Asegúrate de que esto esté importado
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { gsap } from 'gsap';  // Si necesitas animaciones avanzadas


@Component({
  selector: 'app-ar',
  standalone: true,
  templateUrl: './ar.html',
  styleUrls: ['./ar.scss'],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ARComponent implements OnInit {
  selectedScene: string = 'cepillo';
  scenes = [
    {
      id: 'cepillo',
      name: 'Cepillo de Dientes',
      model: '/assets/models/cepillo.glb',
      iosModel: '/assets/models/cepillo.usdz',
      description: 'Modelo 3D de un cepillo de dientes.',
    },
    {
      id: 'human-teeth',
      name: 'Estructura de Dientes Humanos',
      model: '/assets/models/human_teeth.glb',
      iosModel: '/assets/models/human_teeth.usdz',
      description: 'Modelo 3D de la estructura de dientes humanos.',
    }
  ];

  ngOnInit(): void {
    // Ejemplo de animación con GSAP (si lo necesitas)
    gsap.fromTo(".model-viewer", { opacity: 0 }, { opacity: 1, duration: 2 });
  }

  // Funciones para obtener el modelo seleccionado
  getSelectedSceneModel() {
    const selected = this.scenes.find(scene => scene.id === this.selectedScene);
    return selected ? selected.model : '';
  }

  getSelectedSceneIOSModel() {
    const selected = this.scenes.find(scene => scene.id === this.selectedScene);
    return selected ? selected.iosModel : '';
  }

  getSelectedSceneDescription() {
    const selected = this.scenes.find(scene => scene.id === this.selectedScene);
    return selected ? selected.description : '';
  }

  // Función para seleccionar la escena
  selectScene(sceneId: string) {
    this.selectedScene = sceneId;
  }
}
