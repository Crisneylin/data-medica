import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { SharedService } from 'src/app/services/shared.service';
import { PatientService } from '../../services/patient.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { Consultation } from 'src/app/models/consultation';
import { MatDialog } from '@angular/material/dialog';
import { AddConsultationComponent } from '../../consultations/add-consultation/add-consultation.component';
import { Conditions } from 'src/app/models/conditions';
import { ConsultationService } from '../../services/consultation.service';

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.css']
})
export class DetailPatientComponent implements OnInit {

  patient: Patient = {} as Patient;
  consultations: Consultation[] = [] as Consultation[];

  constructor(private sharedService: SharedService, private activatedRoute: ActivatedRoute, private router: Router, private consultationService: ConsultationService,
  private patientService: PatientService, private sweetalert: SweetalertService, private dialog: MatDialog) { }

  ngOnInit() {
    this.sharedService.setMemuHeaderTitle("Detalle del paciente");
    this.activatedRoute.params.subscribe(params => {
      this.patientService.getPatientById(params['id']).then(patient => this.patient = patient);
      
      this.consultationService.getConsultation().subscribe(consultations => {
        this.consultations = consultations.filter(consultation => consultation.patientId == params['id']);
      });
    });

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

  DetailConsultation(consultation: Consultation){
    this.router.navigate([`/page/consultation/${consultation.id || "prueba"}`]).then(() => {
      localStorage.setItem('consultation', JSON.stringify(consultation));
      localStorage.setItem('patient', JSON.stringify(this.patient));
    });
  }

  deleteConsultation(consultation: Consultation){
    this.sweetalert.confirmDelete('¿Está seguro de eliminar esta consulta?', 'La consulta se eliminará de forma permanente').then(async (result) => {
      if (!result.isConfirmed) return;

      this.sharedService.setIsLoading(true);
      
      await this.consultationService.deleteConsultations(consultation.id!).then(response => {
        if (response == undefined) {
          this.sweetalert.success('Consulta borrada', 'La consulta se ha borrado correctamente').then(() => {
            this.router.navigate([`/page/consultations`])
          });
        }
      }, () => this.sweetalert.error('Error', 'No se pudo eliminar'))
      .catch(() => this.sweetalert.error('Error', 'No se pudo eliminar'))
      .finally(() => this.sharedService.setIsLoading(false));
    });
  }



}
