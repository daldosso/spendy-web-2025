import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.css'],
  standalone: true,
})
export class ExpenseChartComponent implements AfterViewInit {
  @ViewChild('expenseChart') expenseChart!: ElementRef;
  chart!: Chart;
  expenses: { category: string; amount: number }[] = [];

  constructor(private expenseService: ExpenseService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe(data => {
      this.expenses = data.map((exp: any) => ({
        category: exp.category,
        amount: exp.amount
      }));
      this.createChart();
    });
  }

  createChart(): void {
    if (!this.expenseChart || !this.expenseChart.nativeElement) {
      console.error('Elemento canvas non trovato');
      return;
    }

    if (this.chart) {
      this.chart.destroy(); // Distrugge il vecchio grafico prima di crearne uno nuovo
    }

    const ctx = this.expenseChart.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.expenses.map(exp => exp.category),
        datasets: [{
          label: 'Spese per categoria',
          data: this.expenses.map(exp => exp.amount),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
          ],
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 2,
          hoverBorderWidth: 3,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              font: {
                size: 14,
                weight: 'bold'
              },
              color: '#333'
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            bodyFont: {
              size: 14
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    });
  }
}
