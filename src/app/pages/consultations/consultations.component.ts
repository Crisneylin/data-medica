import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { ConsultationService } from '../services/consultation.service';
import { Router } from '@angular/router';
import { AddConsultationComponent } from './add-consultation/add-consultation.component';
import { Consultation } from 'src/app/models/consultation';
import { Patient } from 'src/app/models/patient';
import { Conditions } from 'src/app/models/conditions';
import { ConditionService } from '../services/condition.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent implements OnInit {

  patients: Patient[] = [] as Patient[];
  consultations: Consultation[] = [] as Consultation[];
  
  constructor(private sharedService: SharedService, private sweetalert: SweetalertService, private dialog: MatDialog,
    private consultationService: ConsultationService, private patientService: PatientService, private router: Router) { }

  ngOnInit() {
    this.sharedService.setMemuHeaderTitle("Consultorio");
    this.getData();
  }
  
  getData(){
    this.consultationService.getConsultation().subscribe(consultations => {
      this.consultations = consultations;
      consultations.sort((a, b) => b.date.localeCompare(a.date));
    });
  
    this.patientService.getPatients().subscribe(patients => {
      this.patients = patients;
    });
  }

  getPatientById(id: string){
    const patient =  this.patients.find(patient => patient.id == id);
    return patient ? `${patient.name} ${patient.lastname}` : "Paciente no encontrado";
  }

  getDiagnostic(consultation: Conditions[] | undefined){
    let diagnostic = "";
    if(consultation){
      consultation.forEach((condition, index) => {
        diagnostic += `${condition.name}${index < consultation.length - 1 ? ', ' : '.'}`;
      });
    }
    return diagnostic;
  }
  
  openAddConsultation(){
    this.dialog.open(AddConsultationComponent, {
      width: '50%',
    }).afterClosed()
    .subscribe(addConsultation => {
      if (addConsultation) {
        this.getData();
      }
    });
  }

  DetailConsultation(consultation: Consultation){
    this.patientService.getPatientById(consultation.patientId).then((patient)=>{
      this.router.navigate([`/page/consultation/${consultation.id}`]).then(() => {
        localStorage.setItem('consultation', JSON.stringify(consultation));
        localStorage.setItem('patient', JSON.stringify(patient));
      });
    })
  }

  deleteConsultation(consultation: Consultation){
    this.sweetalert.confirmDelete('¿Está seguro de eliminar esta consulta?', 'La consulta se eliminará de forma permanente').then(async (result) => {
      if (!result.isConfirmed) return;

      this.sharedService.setIsLoading(true);
      await this.consultationService.deleteConsultations(consultation.id!).then(response => {
        if (response == undefined) {
          this.sweetalert.success('Consulta borrada', 'La consulta se ha borrado correctamente');
        }
      }, () => this.sweetalert.error('Error', 'No se pudo eliminar'))
      .catch(() => this.sweetalert.error('Error', 'No se pudo eliminar'))
      .finally(() => this.sharedService.setIsLoading(false));
    });
  }

}
