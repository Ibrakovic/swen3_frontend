import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';  // Import provideHttpClient

const routes: Routes = [
  { path: '', component: AppComponent },
  // Add any other necessary routes here
  { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient()  // Add provideHttpClient to the providers array
  ]
};
