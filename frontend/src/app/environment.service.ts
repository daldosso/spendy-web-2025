import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private isAndroidEnvironment(): boolean {
    return typeof (window as any).Android !== 'undefined';
  }

  private isProduction(): boolean {
    return window.location.hostname.includes('spendy-2025.netlify.app');
  }

  getApiUrl(): string {
    if (this.isProduction()) {
      return 'https://spendy-web-2025.onrender.com/api';
    } else if (this.isAndroidEnvironment()) {
      return 'http://10.0.2.2:3000/api';
    } else {
      return 'http://localhost:3000/api';
    }
  }
}
