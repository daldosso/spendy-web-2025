import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from '../environment.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = '';

  constructor(private http: HttpClient, private environmentService: EnvironmentService) {
    this.apiUrl = this.environmentService.getApiUrl() + '/chat';
  }

  sendMessage(message: string): Observable<{ reply: string }> {
    return this.http.post<{ reply: string }>(this.apiUrl, { message });
  }
}
