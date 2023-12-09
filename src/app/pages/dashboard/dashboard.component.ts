import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user$!: Observable<User | null>;
  myChart: any;
  constructor(private sharedService: SharedService, private authService: AuthService) { }

  ngOnInit() {
    this.sharedService.setMemuHeaderTitle('Panel de control');

    this.user$ = this.authService.userState$;

    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    })


  }

}
