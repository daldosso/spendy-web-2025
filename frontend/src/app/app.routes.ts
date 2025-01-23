import { Routes } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: ExpensesComponent }, // Mappa la voce Home
    { path: 'expenses', component: ExpensesComponent },
];
