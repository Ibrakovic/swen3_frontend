// app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from './models/user.model';     // Import User für die Registrierung
import { UserLog } from './models/user.login'; // Import UserLog für das Login

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class AppComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  isLoginPage: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoginPage = this.router.url.includes('login');
  }

  // Registrierungsmethode
  registerUser(event: Event) {
    event.preventDefault();
    if (!this.username || !this.email || !this.password) {
      console.error('Bitte füllen Sie alle Felder aus.');
      return;
    }

    const user: User = { username: this.username, email: this.email, password: this.password };
    this.authService.register(user).subscribe({
      next: response => console.log('Nutzer erfolgreich registriert', response),
      error: error => console.error('Fehler bei der Registrierung', error),
      complete: () => console.log('Registrierungsanfrage abgeschlossen')
    });
  }

  // Login-Methode
  loginUser(event: Event) {
    event.preventDefault();
    if (!this.email || !this.password) {
      console.error('Bitte E-Mail und Passwort eingeben.');
      return;
    }

    const user: UserLog = { email: this.email, password: this.password };
    this.authService.login(user).subscribe({
      next: response => console.log('Nutzer erfolgreich eingeloggt', response),
      error: error => console.error('Fehler beim Einloggen', error),
      complete: () => console.log('Login-Anfrage abgeschlossen')
    });
  }

  togglePage() {
    this.isLoginPage = !this.isLoginPage;
    const targetRoute = this.isLoginPage ? '/login' : '/register';
    this.router.navigate([targetRoute]);
  }
}
