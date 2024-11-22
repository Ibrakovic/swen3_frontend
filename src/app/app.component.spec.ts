// app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule],
  standalone: true
})
export class AppComponent {
  title: string = 'frontend'; // Title property added
  username: string = '';
  email: string = '';
  password: string = '';
  isLoginPage: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoginPage = this.router.url.includes('login');
  }

  // Register and login methods as defined previously
}
