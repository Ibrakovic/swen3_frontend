// src/main.ts

import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

enableProdMode(); // If you always want production mode, leave this in

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch())  // Correct way to use withFetch()
  ]
}).catch(err => console.error(err));
