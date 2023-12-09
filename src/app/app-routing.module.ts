import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { authGuard } from './shared/guards/auth.guard';
import { onlyLoggedInGuard } from './shared/guards/only-logged-in.guard';

const routes: Routes = [
  // { path: '', redirectTo:'page', pathMatch:'full' },	
  { path: '', redirectTo:'auth', pathMatch:'full' },	
  { path: 'auth', canActivate: [authGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'page', canActivate: [onlyLoggedInGuard], loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'not-found', component: NotFoundComponent, pathMatch:'full' },
  { path: '**', redirectTo:'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
