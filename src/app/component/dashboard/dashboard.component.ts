import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  barData: any;
  barOptions: any;
  pieData: any;
  pieOptions: any;
  constructor() { }

  ngOnInit() {
    this.barData = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
          {
              label: 'Users Active',
              backgroundColor: '#dc3545',
              data: [615, 519, 801, 811, 561, 551, 701]
          }
      ]
    };
    this.pieData = {
      labels: ['Business Communication', 'Data Analytics', 'Angular 6', 'IELTS', 'Big Data'],
      datasets: [
        {
            data: [300, 50, 100, 541, 345],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                'blue',
                'green'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FFMAMM',
                '#FFCOPS'
            ]
        }]
    };
    this.barOptions = {
      title: {
        display: true,
        text: 'Daily Active User Statistics',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
    this.pieOptions = {
      title: {
        display: true,
        text: 'User Course Traffic',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }

}
