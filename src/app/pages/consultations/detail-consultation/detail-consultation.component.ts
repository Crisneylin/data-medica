import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Consultation } from 'src/app/models/consultation';
import { Patient } from 'src/app/models/patient';
import { SharedService } from 'src/app/services/shared.service';
import { AddConsultationComponent } from '../add-consultation/add-consultation.component';
import { EditConsultationComponent } from '../edit-consultation/edit-consultation.component';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { ConsultationService } from '../../services/consultation.service';

@Component({
  selector: 'app-detail-consultation',
  templateUrl: './detail-consultation.component.html',
  styleUrls: ['./detail-consultation.component.css']
})
export class DetailConsultationComponent implements OnInit {

  patient: Patient = {} as Patient;
  consultation: Consultation = {} as Consultation;
  constructor(private sharedService: SharedService, private activatedRoute: ActivatedRoute, private router: Router, private dialog: MatDialog,
  private sweetAlert: SweetalertService, private consultationService: ConsultationService) { }

  ngOnInit() {
    this.sharedService.setMemuHeaderTitle("Detalle de la consulta");
    
    this.patient = localStorage.getItem('patient') ? JSON.parse(localStorage.getItem('patient')!) : {} as Patient;
    this.consultation = localStorage.getItem('consultation') ? JSON.parse(localStorage.getItem('consultation')!) : {} as Consultation
  }


  editConsultation() {
    this.dialog.open(EditConsultationComponent, {
      width: '50%',
      data: this.consultation
    }).afterClosed()
    .subscribe(editConsultation => {
      if (editConsultation) {
        this.consultationService.getConsultation().subscribe(consultations => {
          this.consultation = consultations.find(consultation => consultation.id == this.consultation.id)!;
        });
        
      }
    });
  }

  deleteConsultation() {
    this.sweetAlert.confirmDelete('¿Está seguro de eliminar esta consulta?', 'La consulta se eliminará de forma permanente').then(async (result) => {
      if (!result.isConfirmed) return;
      
      this.sharedService.setIsLoading(true);
      await this.consultationService.deleteConsultations(this.consultation.id!).then(response => {
        if (response == undefined) {
          this.sweetAlert.success('Consulta borrada', 'La consulta se ha borrado correctamente').then(() => {
            this.router.navigate([`/page/consultations`])
          });
        }
      }, () => this.sweetAlert.error('Error', 'No se pudo eliminar'))
      .catch(() => this.sweetAlert.error('Error', 'No se pudo eliminar'))
      .finally(() => this.sharedService.setIsLoading(false));
    });
  }
}
