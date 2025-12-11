import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideServiceWorker } from '@angular/service-worker';

import { environment } from '../environments/environment'; // 👈 importante

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),

    // URLs tipo /#/ruta
    provideRouter(routes, withHashLocation()),

    provideHttpClient(),

    // Service worker (solo en producción)
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),

    // Firebase App con configuración desde environment
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    // Firebase Auth y Firestore
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
