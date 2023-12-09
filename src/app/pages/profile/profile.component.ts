import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { SharedService } from 'src/app/services/shared.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private sharedService: SharedService, 
    private dialog: MatDialog, private router: Router, private sweetalert: SweetalertService) { }

  ngOnInit() {
    this.sharedService.setMemuHeaderTitle("Perfil");
  }

}
