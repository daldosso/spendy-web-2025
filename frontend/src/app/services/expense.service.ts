import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { EnvironmentService } from '../environment.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = '';

  constructor(private http: HttpClient, private environmentService: EnvironmentService) {
    this.apiUrl = this.environmentService.getApiUrl() + '/expenses';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  
  getExpenses(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createExpense(expense: any) {
    return this.http.post(this.apiUrl, expense).pipe(
      catchError((error) => {
        return throwError(() => error.error); // Passa l'errore al componente
      })
    );
  }

  updateExpense(id: string, expense: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, expense);
  }

  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
