import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { firebaseProviders } from './firebase.config';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    firebaseProviders, 
    importProvidersFrom(provideAuth(() => getAuth())), 
    importProvidersFrom(provideFirestore(() => getFirestore())), 
    importProvidersFrom(provideMessaging(() => getMessaging())), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp({
      "projectId":"tpsaladejuegos-rotelagustavo",
      "appId":"1:584958712061:web:5a7039b4faadeb9a478694",
      "storageBucket":"tpsaladejuegos-rotelagustavo.appspot.com",
      "apiKey":"AIzaSyC5jrsX7ruu7CCjtsmOtf7sB_UkNeqWqyw",
      "authDomain":"tpsaladejuegos-rotelagustavo.firebaseapp.com",
      "messagingSenderId":"584958712061"}))) ]
};
