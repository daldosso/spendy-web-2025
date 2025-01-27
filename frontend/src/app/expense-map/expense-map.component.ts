import { Component, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-map',
  templateUrl: './expense-map.component.html',
  styleUrls: ['./expense-map.component.css'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Permette l'uso di Web Components
})
export class ExpenseMapComponent implements AfterViewInit {
  latitude: number | null = null;
  longitude: number | null = null;
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.getCoordinates();
  }

  getCoordinates(): void {
    if ((window as any).Android && (window as any).Android.getCoordinates) {
      const coordinates = (window as any).Android.getCoordinates();
      const [latitude, longitude] = coordinates.split(',').map(Number);
      this.latitude = latitude;
      this.longitude = longitude;

      // Debug: Verifica i valori
      console.log('Latitude:', this.latitude, 'Longitude:', this.longitude);
    } else {
      this.errorMessage = 'Impossibile recuperare le coordinate dal dispositivo.';
      console.error('Interfaccia Android non disponibile.');
    }
  }

  refreshMap(): void {
    this.getCoordinates();
  }

  goBack(): void {
    this.router.navigate(['/expense-upsert'], {
      queryParams: { latitude: this.latitude, longitude: this.longitude },
    });
  }
}
