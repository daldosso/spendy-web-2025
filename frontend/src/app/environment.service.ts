import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private isAndroidEnvironment(): boolean {
    return typeof (window as any).Android !== 'undefined';
  }

  getApiUrl(): string {
    if (this.isAndroidEnvironment()) {
      return 'http://10.0.2.2:3000/api';
    } else {
      return 'http://localhost:3000/api';
    }
  }
}
