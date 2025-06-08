import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-poll-chart',
  templateUrl: './poll-chart.component.html',
   styleUrls: ['./poll-chart.component.css'],
})
export class PollChartComponent implements OnInit {
  @Input() question!: string;
  @Input() options!: string[];
  @Input() votes!: number[];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };

  chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};

  ngOnInit(): void {
    this.barChartData = {
      labels: this.options,
      datasets: [
        {
          data: this.votes,
          label: this.question,
          backgroundColor: '#42A5F5',
        },
      ],
    };
  }
}
