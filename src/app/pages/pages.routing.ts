import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PatientComponent } from './patient/patient.component';
import { ConsultationsComponent } from './consultations/consultations.component';
import { DetailPatientComponent } from './patient/detail-patient/detail-patient.component';
import { DetailConsultationComponent } from './consultations/detail-consultation/detail-consultation.component';

const routes: Routes = [
  { 
    path: '', component: PagesComponent, children:[
      { path: '', redirectTo:'dashboard', pathMatch:'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'patient', component: PatientComponent },
      { path: 'detail-patient/:id', component: DetailPatientComponent },
      { path: 'consultations', component: ConsultationsComponent },
      { path: 'consultation/:id', component: DetailConsultationComponent },
      { path: 'profile', component: ProfileComponent}
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PagesRouting { }