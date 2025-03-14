import { Component, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Usa CommonModule per i componenti standalone
import { ExpensesComponent } from './expenses/expenses.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true, // Indica che il componente è standalone
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corretta la proprietà styleUrls
})
export class AppComponent {
  title = 'spendy';

  @ViewChild(ExpensesComponent) expensesList!: ExpensesComponent;

}
