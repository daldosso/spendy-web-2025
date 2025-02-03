import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class NavbarComponent {
  menuOpen = false;

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  goToExpenses(): void {
    this.router.navigate(['/expenses']);
    this.toggleMenu();
  }  
  
  goToCharts(): void {
    this.router.navigate(['/chart']);
    this.toggleMenu();
  }

  goToChat(): void {
    this.router.navigate(['/chat']);
    this.toggleMenu();
  }
}
