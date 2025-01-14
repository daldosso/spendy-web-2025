import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpensesComponent } from "./expenses/expenses.component";
import { AddExpenseComponent } from "./add-expense/add-expense.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ExpensesComponent, AddExpenseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'spendy';

  @ViewChild(ExpensesComponent) expensesList!: ExpensesComponent;

  handleNewExpense(expense: { description: string; amount: number; date: Date }) {
    this.expensesList.addExpense(expense);
  }
}
