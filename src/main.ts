import 'zone.js'; // 👈 requerido en modo con zone
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import '@google/model-viewer'; // registra <model-viewer>
import { environment } from './environments/environment'; // Asegúrate de importar el archivo correcto
import { ServiceWorkerModule } from '@angular/service-worker';

if ('serviceWorker' in navigator && environment.production) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch(error => {
        console.log('Error al registrar el Service Worker:', error);
      });
  });
}

bootstrapApplication(App, appConfig).catch(console.error);
