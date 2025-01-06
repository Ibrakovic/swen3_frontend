import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>`, // Zeigt die aktive Route an
  standalone: true,
  imports: [
    RouterOutlet
  ]
})
export class AppComponent {}
