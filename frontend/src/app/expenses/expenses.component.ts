import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-expenses',
  standalone: true, // Specifica che il componente è standalone
  imports: [
    CommonModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,    
  ], // Importa i moduli necessari
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {

  categories: string[] = ['Alimentazione', 'Trasporti', 'Intrattenimento', 'Casa', 'Salute', 'Altro'];

  expenses = [
    { description: 'Cena al ristorante', amount: 50, date: new Date('2025-01-01'), category: 'Alimentazione' },
    { description: 'Abbonamento Netflix', amount: 15, date: new Date('2025-01-03'), category: 'Intrattenimento' },
    { description: 'Spesa', amount: 120, date: new Date('2025-01-05'), category: 'Casa' },
  ];

  editingIndex: number | null = null;

  addExpense(expense: { description: string; amount: number; date: Date; category: string }): void {
    this.expenses.push(expense);
  }

  editExpense(index: number): void {
    this.editingIndex = index;
  }
  
  saveExpense(): void {
    this.editingIndex = null; // Salva la modifica e chiude il form
  }
  
  cancelEdit(): void {
    this.editingIndex = null; // Annulla l'editing
  }

  deleteExpense(index: number): void {
    this.expenses.splice(index, 1);
  }
  
}
