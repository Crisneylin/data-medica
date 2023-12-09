import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  isLoading: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.getIsLoading().subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }

}
