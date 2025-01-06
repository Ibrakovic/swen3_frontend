import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    protected router: Router
  ) {
    // Initialisiere das Login-Formular
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email-Validierung
      password: ['', [Validators.required, Validators.minLength(6)]], // Passwort-Validierung
    });
  }

  backToHome() {
    this.router.navigate(['/']).then(r => " Gehe auf Homescreen "); // Navigiert zur Startseite
  }

  // Login-Methode
  onLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly.';
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Benutzername oder Token speichern
        sessionStorage.setItem('userName', 'email');

        this.errorMessage = null;
        this.router.navigate(['/dashboard']); // Nach Login zur Dashboard-Seite navigieren
      },
      error: (error) => {
        // Fehlerbehandlung basierend auf dem Backend-Fehlercode
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password.';
        } else {
          this.errorMessage =
            'Something went wrong. Please try again later.';
        }
      },
    });
  }
}

