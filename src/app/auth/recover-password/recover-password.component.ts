import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { ErrorFirebaseMessage } from 'src/app/components/util/errorFirebase';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['../auth.component.css', '../auth.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  
  formResetControl: FormGroup;

  constructor(private router: Router, private sweetAlert: SweetalertService,
  private sharedService: SharedService, private authService: AuthService) { 
    this.formResetControl = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
  }

  redirectLogin(){
    this.router.navigate(['/auth/login']);
  }

  async SendResetEmail() {  
    this.sharedService.setIsLoading(true);
    
    if (this.formResetControl.valid) {
      this.authService.sendPasswordResetEmail(this.formResetControl.value.email)
      .then((resp) => {
        if (resp) {          
          this.sweetAlert.warning('¡Error de registro!', ErrorFirebaseMessage.get(resp.code) || resp.message);
          this.sharedService.setIsLoading(false);
        } else {
          this.sweetAlert.info('¡Correo enviado!', 'Se ha enviado un correo para restablecer su contraseña');
        }
      });
      this.sharedService.setIsLoading(false);
      this.router.navigate(['/auth/login']);
    }
  }


}
