/* Modules */
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PagesRouting } from './pages.routing';
import { SharedModule } from "../shared/shared.module";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

/* Components */
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PatientComponent } from './patient/patient.component';
import { AddPatientComponent } from './patient/add-patient/add-patient.component';
import { EditPatientComponent } from './patient/edit-patient/edit-patient.component';
import { DetailConsultationComponent } from './consultations/detail-consultation/detail-consultation.component';
import { DetailPatientComponent } from './patient/detail-patient/detail-patient.component';
import { ConsultationsComponent } from './consultations/consultations.component';
import { AddConsultationComponent } from './consultations/add-consultation/add-consultation.component';
import { EditConsultationComponent } from './consultations/edit-consultation/edit-consultation.component';
import { StringFormatPipe } from '../shared/pipes/string-format.pipe';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProfileComponent,
    PatientComponent,
    AddPatientComponent,
    EditPatientComponent,
    DetailPatientComponent,
    ConsultationsComponent,
    AddConsultationComponent,
    EditConsultationComponent,
    DetailConsultationComponent,
    StringFormatPipe
  ],
  imports: [
    CommonModule,
    PagesRouting,
    SharedModule,
    MatSidenavModule,
    MatDialogModule,
    MatFormFieldModule,
    NgxDropzoneModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ComponentsModule,
    
  ],
  providers: [
    DatePipe,
    provideNgxMask()
  ]
})
export class PagesModule { }
