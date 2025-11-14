import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.html',
  styleUrls: ['./services.scss'],
  imports: [CommonModule],
})
export class ServicesComponent implements OnInit {
  // Servicios y el servicio seleccionado
  services: any[] = [];
  selectedService: any;  // Definir la propiedad selectedService

  loading: boolean = true;
  error: string = '';

  constructor(private supabase: SupabaseService) {}

  ngOnInit(): void {
    // Cargar servicios desde Supabase (ajusta este código según tu backend)
    this.loadServices();
  }

  // Función para cargar los servicios
  async loadServices() {
    try {
      const servicesData = await this.supabase.getServices();  // Asegúrate de que 'getServices' devuelva la lista de servicios
      this.services = servicesData ?? [];
      this.loading = false;
    } catch (e: any) {
      console.error('Error loading services:', e);
      this.error = e.message;
      this.loading = false;
    }
  }

  // Función para mostrar los detalles de un servicio
  showDetails(service: any) {
    this.selectedService = service;  // Asignamos el servicio seleccionado a la propiedad 'selectedService'
    // Aquí podrías realizar cualquier otra acción, como abrir un modal o mostrar detalles adicionales
  }
}
