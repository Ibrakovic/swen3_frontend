import { Component } from '@angular/core';
import { AuthService } from './auth.service';  // Import the AuthService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true
})
export class AppComponent {
  title = 'frontend';

  constructor(private authService: AuthService) {}  // Inject AuthService

  registerUser() {
    const dummyData = {
      username: 'testuser',
      password: 'password123',
    };

    this.authService.register(dummyData).subscribe((response) => {
      console.log('User registered:', response);  // Log the registration response
    });
  }
}
