import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ExpenseService } from '../services/expense.service';
import { UpsertExpenseComponent } from '../upsert-expense/upsert-expense.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-expenses',
  standalone: true, // Specifica che il componente è standalone
  imports: [
    CommonModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    UpsertExpenseComponent,
    MatCardModule,
  ], // Importa i moduli necessari
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {

  categories: string[] = ['Alimentazione', 'Trasporti', 'Intrattenimento', 'Casa', 'Salute', 'Altro'];

  editingIndex: number | null = null;

  errorMessage: string | null = null;

  constructor(private expenseService: ExpenseService) {}

  expenses: any[] = [];
  expensesChart: any[] = [];

  currentExpense: any = null;
  showForm = false;
  isEditMode = false;

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe((data) => {
      this.expenses = data;

      this.expensesChart = data.map((exp: any) => ({
        category: exp.category,
        amount: exp.amount
      }));
    });
  }

  editExpense(index: number): void {
    this.editingIndex = index;
    this.isEditMode = true;
    this.showForm = true;
    this.currentExpense = this.expenses[index];
  }
  
  saveExpense(): void {
    this.editingIndex = null; // Salva la modifica e chiude il form
  }
  
  cancelEdit(): void {
    this.editingIndex = null; // Annulla l'editing
  }

  showAddExpenseForm(): void {
    this.currentExpense = { description: '', amount: 0, date: '', category: '' };
    this.isEditMode = false;
    this.showForm = true;
  }

  handleSaveExpense(expense: any): void {
    if (this.isEditMode) {
      const index = this.expenses.findIndex(e => e === this.currentExpense);
      this.expenses[index] = expense;
      // Aggiorna nel backend
      this.expenseService.updateExpense(this.currentExpense._id, expense).subscribe({
        next: () => console.log('Spesa aggiornata con successo.'),
        error: (err) => console.error('Errore durante l\'aggiornamento della spesa:', err),
      });
    } else {
      this.expenseService.createExpense(expense).subscribe({
        next: (newExpense) => {
          this.expenses.push(newExpense);
        },
        error: (err) => {
          console.error('Errore durante l\'aggiunta della spesa:', err);
          this.errorMessage = err.details;
        }
      });
    }
    this.showForm = false;
  }

  handleCancel(): void {
    this.showForm = false;
  }

  deleteExpense(index: number): void {
    const expenseToDelete = this.expenses[index];
    this.expenses.splice(index, 1);
    this.expenseService.deleteExpense(expenseToDelete._id).subscribe({
      next: () => console.log('Spesa eliminata con successo.'),
      error: (err) => console.error('Errore durante l\'eliminazione della spesa:', err),
    });
  }
  
}
