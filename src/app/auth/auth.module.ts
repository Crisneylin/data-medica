import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutes } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { VerificationEmailComponent } from './verification-email/verification-email.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    VerificationEmailComponent,
    RegisterComponent,
    RecoverPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutes,
    SharedModule
  ],
  providers: [
    DatePipe
  ]
})
export class AuthModule { }
