import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { AssignmentService } from 'src/app/services/assignment.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LabTaskService } from 'src/app/services/lab-task.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  registeredUsersCount: number = 100; // Replace with the actual count

  constructor(
    private _title: Title,
    private _dashboard: DashboardService,
    private sncak: MatSnackBar,
  ) { }
  totalUsers: any;
  totalMentors: any;
  totalCompanies: any;

  users: any[] = [];

  ngOnInit(): void {
    this._title.setTitle('DashBoard | Admin | CodeVenture');
    this.countUsers();
    this.loadUsers();

    console.log(1);

  }


  countUsers() {
    this._dashboard.countUsers().subscribe(
      (data: any) => {
        this.totalUsers = data.normalUsers;
        this.totalMentors = data.mentorUsers;
        this.totalCompanies = data.companyUsers;
      },
      (error) => {
        this.sncak.open('Error in Counting Users.', 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        })
      }
    );
  }


  loadUsers() {
    this._dashboard.getAllUsers().subscribe(
      (data: any) => {
        this.users = data;
        console.log(data);
        this.loadGraph();

      },
      (error) => {
        this.sncak.open('Error in loading users.', 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    );
  }

  loadGraph() {
    const dateCounts: any = {};

    this.users.forEach(user => {
      const date = user.date;
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    const uniqueDates = Object.keys(dateCounts).sort();
    const counts = uniqueDates.map(date => dateCounts[date]);

    new Chart('myChart', {
      type: 'bar',
      data: {
        labels: uniqueDates,
        datasets: [{
          label: 'Registered Users',
          data: counts,
          backgroundColor: 'rgba(255, 64, 129, 0.3)',
          borderColor: 'rgba(255, 64, 129, 1)',
          borderWidth: 1,
          borderRadius: 20,
          hoverBackgroundColor: 'rgba(255, 64, 129, 1)',
          hoverBorderWidth: 5
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            grace: 3,
            ticks: {
              // stepSize:2
            }
          }
        },
        responsive: false
      },
    });
  }
}

