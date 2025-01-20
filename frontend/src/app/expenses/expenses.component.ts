import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ExpenseService } from '../services/expense.service';
import { AddExpenseComponent } from '../add-expense/add-expense.component';


@Component({
  selector: 'app-expenses',
  standalone: true, // Specifica che il componente è standalone
  imports: [
    CommonModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AddExpenseComponent,
  ], // Importa i moduli necessari
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {

  categories: string[] = ['Alimentazione', 'Trasporti', 'Intrattenimento', 'Casa', 'Salute', 'Altro'];

  editingIndex: number | null = null;

  constructor(private expenseService: ExpenseService) {}

  expenses: any[] = [];

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe((data) => {
      this.expenses = data;
    });
  }

  addExpense(expense: { description: string; amount: number; date: Date; category: string }): void {
    this.expenseService.createExpense(expense).subscribe({
      next: (newExpense) => {
        this.expenses.push(newExpense);
      },
      error: (err) => {
        console.error('Errore durante l\'aggiunta della spesa:', err);
      },
    });
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
