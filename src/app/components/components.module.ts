import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { CheckBoxComponent } from './check-box/check-box.component';
import { ViewImageComponent } from './view-image/view-image.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule
  ],
  declarations: [
    CheckBoxComponent,
    ViewImageComponent
  ],
  exports: [
    CheckBoxComponent,
    ViewImageComponent
  ]
})
export class ComponentsModule { }
