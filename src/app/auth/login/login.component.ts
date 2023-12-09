import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { AuthService } from '../service/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { ErrorFirebaseMessage } from 'src/app/components/util/errorFirebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.component.css']
})
export class LoginComponent implements OnInit {
  formLoginControl: FormGroup;

  constructor(private router: Router, private sweetAlert: SweetalertService,
  private sharedService: SharedService, private authService: AuthService) {
    this.formLoginControl = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }

  redirectCheckIn(){
    this.router.navigate(['/auth/register']);
  }

  async signIn(){
    this.sharedService.setIsLoading(true);
    if (this.validatedForm()) {      
      await this.authService.signIn(this.formLoginControl.value.email, this.formLoginControl.value.password)
      .then((resp) => {
        if (resp) {
          this.sweetAlert.warning('¡Error de autenticación!', ErrorFirebaseMessage.get(resp.code) || resp.message);
        }
        this.sharedService.setIsLoading(false);
      });
    }
    this.sharedService.setIsLoading(false);
  }

  validatedForm(): boolean{
    if (!this.formLoginControl.controls['email'].valid) {
      this.sweetAlert.info('¡Usuario inválido!','Debe ingresar el nombre de usuario o email');
      return false;
    }
    if (!this.formLoginControl.controls['password'].valid) {
      this.sweetAlert.info('¡Contraseña inválida!', 'Debe ingresar la contraseña');
      return false;
    }

    return true;
  }
}
