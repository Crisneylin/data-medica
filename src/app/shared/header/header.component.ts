import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User as UserAuth } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { User } from 'src/app/models/user';
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
  user$!: Observable<UserAuth | null>;
  userLogin: User = {} as User;
  
  constructor(private sharedService: SharedService, private router: Router, private authService: AuthService, private userService: UserService) { }
  
  ngOnInit() {
    this.sharedService.getMenuHeaderTitle().subscribe(title => {
      this.MenuHeadertitle = title;
    });

    this.userName = localStorage.getItem('userName')!;
    this.authService.userState$.subscribe(user => {
      if(user){
        console.log(user);
        this.userService.getUserLogin(user.uid).subscribe(userLogin => {          
          this.userLogin = userLogin[0];
        });
      }
    });
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
