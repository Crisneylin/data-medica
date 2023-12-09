import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserService } from 'src/app/pages/services/user.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideMenuChange = new EventEmitter();
  MenuHeadertitle: string = '';
  userName: string = '';
  
  constructor(private sharedService: SharedService, private router: Router, private authService: AuthService, private userService: UserService) { }
  
  ngOnInit() {
    this.sharedService.getMenuHeaderTitle().subscribe(title => {
      this.MenuHeadertitle = title;
    });

    this.userName = localStorage.getItem('userName')!;
  }

  getUser(){
  }

  redirectToProfile(){
    this.router.navigate(['/page/profile']);
  }

  logout() {
    this.authService.signOut().then(() => {
      localStorage.removeItem('userName');
      this.router.navigate(['/auth']);
    });
  }

  toggleSideMenu() {    
    this.toggleSideMenuChange.emit();
  }

}
