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

    // Firebase App con config desde variables de entorno
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: process.env['NG_APP_FIREBASE_API_KEY'] || "",
        authDomain: process.env['NG_APP_FIREBASE_AUTH_DOMAIN'] || "",
        projectId: process.env['NG_APP_FIREBASE_PROJECT_ID'] || "",
        storageBucket: process.env['NG_APP_FIREBASE_STORAGE_BUCKET'] || "",
        messagingSenderId: process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'] || "",
        appId: process.env['NG_APP_FIREBASE_APP_ID'] || "",
        measurementId: process.env['NG_APP_FIREBASE_MEASUREMENT_ID'] || ""
      })
    ),

    // Firebase Auth y Firestore
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
