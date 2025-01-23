import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

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
    MatNativeDateModule,
  ],
  templateUrl: './upsert-expense.component.html',
  styleUrls: ['./upsert-expense.component.css'],
})
export class UpsertExpenseComponent {
  @Input() expense: any = { description: '', amount: 0, date: '', category: '' };
  @Input() isEditMode = false;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  categories = ['Alimentazione', 'Trasporti', 'Intrattenimento', 'Casa', 'Salute', 'Altro'];

  onSubmit(): void {
    this.save.emit(this.expense);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
