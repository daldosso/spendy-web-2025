import { Routes } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseMapComponent } from './expense-map/expense-map.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ExpenseChartComponent } from './expense-chart/expense-chart.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: ExpensesComponent }, // Mappa la voce Home
    { path: 'expenses', component: ExpensesComponent },
    { path: 'map', component: ExpenseMapComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'chart', component: ExpenseChartComponent },
    { path: 'chat', component: ChatComponent },

];
