import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { VerificationEmailComponent } from './verification-email/verification-email.component';
import { RegisterComponent } from './register/register.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

const routes: Routes = [
  { path: '', component: AuthComponent, children: [
    { path: '', redirectTo:'login', pathMatch:'full' },
    { path: 'login', component: LoginComponent },
    { path: 'verification-email', component: VerificationEmailComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover-password', component: RecoverPasswordComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutes { }
