import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { DashboardComponent} from './features/dashboard/dashboard.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([
      { path: '', component: HomeComponent }, // Startseite mit Buttons
      { path: 'login', component: LoginComponent }, // Login-Seite
      { path: 'register', component: RegisterComponent }, // Register-Seite
      { path: 'dashboard', component: DashboardComponent }, // Dashboard-Seite
      { path: '**', redirectTo: '', pathMatch: 'full' }, // Wildcard-Route
    ]),
    provideHttpClient(),
  ],
};
