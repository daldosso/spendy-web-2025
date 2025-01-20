import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule, 
  ],
})
export class AddExpenseComponent {
  newExpense = { description: '', amount: 0, date: '', category: '' };

  categories = ['Alimentazione', 'Trasporti', 'Intrattenimento', 'Casa', 'Salute', 'Altro'];

  @Output() newExpenseEvent = new EventEmitter<{ description: string; amount: number; date: Date; category: string }>();

  addExpense() {
    console.log('Nuova spesa:', this.newExpense);
    const expense = {
      ...this.newExpense,
      date: new Date(this.newExpense.date) // Converti la data in formato Date
    };
    this.newExpenseEvent.emit(expense);
    // Resetta il form dopo l'invio
    this.newExpense = { description: '', amount: 0, date: '', category: '' };
  }
}
