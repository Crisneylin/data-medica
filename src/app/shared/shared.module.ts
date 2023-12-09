import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoadingComponent } from './loading/loading.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    NotFoundComponent,
    LoadingComponent,
    HeaderComponent,
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    // NgbDropdownModule,
  ],
  exports: [
    NotFoundComponent,
    LoadingComponent,
    HeaderComponent,
    SideMenuComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class SharedModule { }

