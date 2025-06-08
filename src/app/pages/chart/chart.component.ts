import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @Input() question!: string;
  @Input() options!: string[];
  @Input() votes!: number[];

  public pieChartData: any;
  public pieChartLabels: string[] = [];
  public pieChartType: ChartType = 'pie';

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce(
              (sum: number, val: number) => sum + val,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} oy (${percentage}%)`;
          },
        },
      },
    },
  };

  ngOnInit(): void {
    this.pieChartLabels = this.options;
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [
        {
          data: this.votes,
          backgroundColor: [
            '#42A5F5',
            '#FFCA28',
            '#66BB6A',
            '#EF5350',
            '#AB47BC',
          ],
        },
      ],
    };
  }
}
