import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expenses',
  standalone: true, // Specifica che il componente è standalone
  imports: [CommonModule], // Importa i moduli necessari
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {
  expenses = [
    { description: 'Cena al ristorante', amount: 50, date: new Date('2025-01-01') },
    { description: 'Abbonamento Netflix', amount: 15, date: new Date('2025-01-03') },
    { description: 'Spesa', amount: 120, date: new Date('2025-01-05') },
  ];
}
