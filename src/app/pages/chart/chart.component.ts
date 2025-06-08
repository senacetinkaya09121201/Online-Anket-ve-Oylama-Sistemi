import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
   styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() question!: string;
  @Input() options!: string[];
  @Input() votes!: number[];

  public pieChartData: any;
  public chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  ngOnInit(): void {
    this.pieChartData = {
      labels: this.options,
      datasets: [
        {
          data: this.votes,
          backgroundColor: ['#42A5F5', '#FFCA28', '#66BB6A', '#EF5350', '#AB47BC'],
        },
      ],
    };
  }
}
