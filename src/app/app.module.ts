import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Ensure HttpClientModule is imported
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { AppRoutingModule } from './app-routing.module'; // Import the AppRoutingModule

@NgModule({
  declarations: [
    AppComponent,
    // Declare other components here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule // Include routing here
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
