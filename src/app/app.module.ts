// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {AppComponent} from './app.component';
import {AuthService} from './services/auth.service';
import {FormsModule} from '@angular/forms';
import {provideHttpClient} from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    FormsModule
  ],
  providers: [AuthService, provideHttpClient()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
