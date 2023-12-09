import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Patient } from 'src/app/models/patient';
import { SharedService } from 'src/app/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { Router } from '@angular/router';
import { SweetalertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: Patient[] = [] as Patient[];

  constructor(private patientService: PatientService, private sharedService: SharedService, 
    private dialog: MatDialog, private router: Router, private sweetalert: SweetalertService) { }

  ngOnInit() {
    this.sharedService.setMemuHeaderTitle("Pacientes");
    this.getPatients();
  }

  getPatients(){
    this.sharedService.setIsLoading(true);
    this.patientService.getPatients().subscribe(response => {
      this.patients = response;
      this.patients.sort((a, b) => a.name.localeCompare(b.name));
      this.sharedService.setIsLoading(false);
    }, () => {
      this.sweetalert.error('Error', 'No se pudo obtener los pacientes')
      this.sharedService.setIsLoading(false);
    });
  }

  async deletePatient(patientId: string){
    this.sweetalert.confirmDelete('¿Está seguro de eliminar este paciente?', 'El paciente se eliminará de forma permanente').then(async (result) => {
      if (!result.isConfirmed) return;

      this.sharedService.setIsLoading(true);
      await this.patientService.deletePatient(patientId).then(response => {
        if (response == undefined) {
          this.sweetalert.success('Paciente borrado', 'El paciente se ha borrado correctamente');
        }
      }, () => this.sweetalert.error('Error', 'No se pudo eliminar el paciente'))
      .catch(() => this.sweetalert.error('Error', 'No se pudo eliminar el paciente'))
      .finally(() => this.sharedService.setIsLoading(false));
    });
  }

  openAddPatient(){
    this.dialog.open(AddPatientComponent, {
      width: '50%',
    }).afterClosed()
    .subscribe(addPatient => {
      if (addPatient) {
        this.getPatients();
      }
    });
  }

  openEditPatient(patient: Patient){
    this.dialog.open(EditPatientComponent, {data: patient}).afterClosed()
    .subscribe(editPatient => {
      if (editPatient) {
        this.getPatients();
      }
    });
  }

  openDetailsPatient(patientId: string){
    this.router.navigate([`/page/detail-patient/${patientId}`]);
  }


}
