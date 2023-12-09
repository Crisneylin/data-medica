import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification-email',
  templateUrl: './verification-email.component.html',
  styleUrls: ['./verification-email.component.css', '../auth.component.css']
})
export class VerificationEmailComponent implements OnInit {
  formVerificationEmailControl!: FormGroup;

  constructor(private router: Router) { 
    // this.formVerificationEmailControl = new FormGroup({

    // });
  }

  ngOnInit() {
  }

  singInRedirect(){
    this.router.navigate(['/auth/login']);
  }

}
