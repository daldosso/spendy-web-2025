import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private isAndroidEnvironment(): boolean {
    // Verifica la presenza dell'interfaccia Android
    return typeof (window as any).Android !== 'undefined';
  }

  getApiUrl(): string {
    if (this.isAndroidEnvironment()) {
      // URL per l'emulatore o dispositivo Android
      return 'http://10.0.2.2:3000/api';
    } else {
      // URL per il browser
      return 'http://localhost:3000/api';
    }
  }
}
