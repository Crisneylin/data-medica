import { Injectable, inject } from '@angular/core';
import { Auth, User, authState, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ErrorResponse } from 'src/app/models/error-response';
import { UserService } from 'src/app/pages/services/user.service';
import { User as UserAuth} from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  constructor(private userService: UserService) {
  }

  get userState$(){
    return authState(this.auth);
  }

  async signUp(userAuth: UserAuth, password: string): Promise<ErrorResponse | void> {
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth, userAuth.email, password);
      await this.sendEmailVerification(user).then( async () => {
        userAuth.userAuthId = user?.uid;
        this.userService.addUser(userAuth).then(async () => {
          await this.signOut().then(() => {
            this.router.navigate(['/auth/verification-email']);
          });
        });
      });
      
    } catch (error:unknown) {
      return error as ErrorResponse;
    }
  }

  async signIn(email: string, password: string): Promise<ErrorResponse | void> {
    try {
      const { user } = await signInWithEmailAndPassword(this.auth, email, password);      
      
      await this.checkUserIsVerified(user);

    } catch (error:unknown) {
      return error as ErrorResponse;
    }
  }

  async signOut(): Promise<ErrorResponse | void> {
    try {      
      await this.auth.signOut();
    } catch (error:unknown) {
      return error as ErrorResponse;
    }
  }

  async sendEmailVerification(user: User): Promise<ErrorResponse | void> {
    try {
      await sendEmailVerification(user);
    } catch (error:unknown) {
      return error as ErrorResponse;
    }
  }

  async sendPasswordResetEmail(email: string): Promise<ErrorResponse | void> {
    try {
      await sendPasswordResetEmail(this.auth,email);
    } catch (error:unknown) {
      return error as ErrorResponse;
    }
  }

  private async checkUserIsVerified(user: User): Promise<void> {
    if (user.emailVerified) {
      this.router.navigate(['/page/dashboard'])
    } else {
      this.sendEmailVerification(user)
      await this.signOut().then(() => {
        this.router.navigate(['/auth/verification-email'])
      });
    }
  }

}
