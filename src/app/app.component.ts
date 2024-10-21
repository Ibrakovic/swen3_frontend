import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'; // Import the User interface
import { AuthService } from './auth.service'; // Import the AuthService
import { User } from './models/user.model';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class AppComponent {

  @ViewChild('userForm') userForm!: NgForm;

  username: string = '';
  email: string = '';
  password: string = '';
  title: string = 'frontend';

  constructor(private authService: AuthService) {}  // Inject AuthService

  registerUser(event: Event) {
    event.preventDefault();
    console.log('Formularstatus:', this.userForm.form.valid, this.userForm.form.controls);


    if (this.userForm.form.valid) {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      console.log('Registering user', this.username);

      this.authService.register(user).subscribe({
        next: response => {
          console.log('User registered successfully', response);
        },
        error: error => {
          console.error('Error registering user', error);
        },
        complete: () => {
          console.log('Registration request completed');
        }
      });
    }
    else {
      console.error('Das Formular ist ungültig.');
    }
  }
}
