import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'http://localhost:3000/api/expenses';

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createExpense(expense: any): Observable<any> {
    return this.http.post(this.apiUrl, expense);
  }

  updateExpense(id: string, expense: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, expense);
  }

  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
