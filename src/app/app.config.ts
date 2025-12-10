import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),

    // URLs tipo /#/ruta
    provideRouter(routes, withHashLocation()),

    provideHttpClient(),

    // Service worker (solo en producción)
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),

    // Firebase App con la config correcta de "dental-clinic-273f2"
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyBkSl-bVBYytl-KKmvujs27JOlO0WC0Guc",
        authDomain: "dental-clinic-273f2.firebaseapp.com",
        projectId: "dental-clinic-273f2",
        storageBucket: "dental-clinic-273f2.firebasestorage.app",
        messagingSenderId: "988391503024",
        appId: "1:988391503024:web:2f61133e18c5af05117775",
        measurementId: "G-R1NR76JB42"
      })
    ),

    // Firebase Auth y Firestore
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
