import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { AuthService } from '../service/auth.service';
import { User } from 'src/app/models/user';
import { ErrorFirebaseMessage } from 'src/app/components/util/errorFirebase';
import { GenderEnum } from 'src/app/models/enum/gender.enum';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../auth.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {} as User;
  formRegisterControl: FormGroup;

  constructor(private router: Router, private authService: AuthService, private datePipe: DatePipe,
  private sweetAlert: SweetalertService, private sharedService: SharedService) { 
    this.formRegisterControl = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      gender: new FormControl(GenderEnum.Man, [Validators.required, Validators.pattern(/^(Hombre|Mujer)$/i)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(14)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  ngOnInit() {
  }

  redirectLogin(){
    this.router.navigate(['/auth/login']);
  }

  async signUp(){
    this.sharedService.setIsLoading(true);
    
    if (!this.formRegisterControl.valid) {
      this.sweetAlert.error('Datos inválidos', 'Por favor, llene el formulario correctamente');
      this.sharedService.setIsLoading(false);
      return;
    }
    
    this.user = this.formRegisterControl.value;
    this.user.created_at = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')!;
    this.user.is_active = true;

    await this.authService.signUp(this.user, this.formRegisterControl.value.password).then(response => {
      if (response) {
        this.sweetAlert.warning('¡Error de registro!', ErrorFirebaseMessage.get(response.code) || response.message);
        this.sharedService.setIsLoading(false);
      }
    }, () => this.sweetAlert.error('Error', 'No se pudo agregar el paciente'))
    .catch(() => this.sweetAlert.error('Error', 'No se pudo agregar el paciente'))
    .finally(() => this.sharedService.setIsLoading(false));
  }


}
