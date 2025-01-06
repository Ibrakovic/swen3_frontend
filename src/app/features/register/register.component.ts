import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule} from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Erstellen des Formulars mit Validierungsregeln
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Methode für "Back to Home"-Navigation
  backToHome() {
    this.router.navigate(['/']); // Navigiert zur Startseite
  }

  // Methode zum Senden der Registrierungsanfrage
  onRegister() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly.';
      this.successMessage = null;
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.successMessage = 'Registration successful!';
        this.errorMessage = null;
        this.registerForm.reset(); // Formular zurücksetzen
      },
      error: (error) => {
        // Backend-Fehlercodes behandeln
        if (error.status === 409) {
          this.errorMessage = 'Username or email already in use.';
        } else if (error.status === 400 && error.error?.message) {
          // Spezifische Validierungsfehler vom Backend
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Something went wrong. Please try again later.';
        }
        this.successMessage = null;
      },
    });
  }
}
