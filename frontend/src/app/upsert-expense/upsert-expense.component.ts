import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDateFnsModule, DateFnsAdapter } from '@angular/material-date-fns-adapter';
import { it } from 'date-fns/locale';

export const ITALIAN_DATE_FORMATS = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMMM yyyy',
    dateA11yLabel: 'LLLL',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'app-upsert-expense',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDateFnsModule, // Usa solo DateFns (rimosso MatNativeDateModule)
  ],
  templateUrl: './upsert-expense.component.html',
  styleUrls: ['./upsert-expense.component.css'],
  providers: [
    { provide: DateAdapter, useClass: DateFnsAdapter }, // Adatta date-fns come adapter
    { provide: MAT_DATE_LOCALE, useValue: it }, // Passa il locale correttamente
    { provide: MAT_DATE_FORMATS, useValue: ITALIAN_DATE_FORMATS },
  ],
})

export class UpsertExpenseComponent {
  @Input() expense: any = { description: '', amount: 0, date: '', category: '' };
  @Input() isEditMode = false;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  categories = ['Alimentazione', 'Trasporti', 'Intrattenimento', 'Casa', 'Salute', 'Altro'];

  onSubmit(): void {
    if (this.expense.description && this.expense.amount > 0 && this.expense.date && this.expense.category) {
      this.save.emit(this.expense);
    } else {
      //this.errorMessage = 'Compila tutti i campi richiesti prima di salvare.';
    }
  }
  

  onCancel(): void {
    this.cancel.emit();
  }

  capturedImage: string | null = null;
  
  openCamera(): void {
    if ((window as any).Android && (window as any).Android.openCamera) {
      (window as any).Android.openCamera();
    } else {
      console.error('Interfaccia Android non disponibile');
    }
  }

  getCapturedImage(): void {
    if ((window as any).Android && (window as any).Android.getCapturedImage) {
      const base64Image = (window as any).Android.getCapturedImage();
      if (base64Image) {
        this.capturedImage = `data:image/png;base64,${base64Image}`;
      }
    } else {
      console.error('Interfaccia Android non disponibile');
    }
  }

  constructor(private router: Router) {}

  gotoMap(): void {
    this.router.navigate(['/map']);
  }
}
