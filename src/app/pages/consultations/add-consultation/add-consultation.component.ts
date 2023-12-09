import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getErrorMessage } from 'src/app/components/util';
import { Consultation } from 'src/app/models/consultation';
import { SharedService } from 'src/app/services/shared.service';
import { ConsultationService } from '../../services/consultation.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { DatePipe } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { Conditions } from 'src/app/models/conditions';
import { Patient } from 'src/app/models/patient';
import { PatientService } from '../../services/patient.service';
import { ConditionService } from '../../services/condition.service';

@Component({
  selector: 'app-add-consultation',
  templateUrl: './add-consultation.component.html',
  styleUrls: ['./add-consultation.component.css']
})
export class AddConsultationComponent implements OnInit {

  consultationForm: FormGroup;
  consultation: Consultation = {} as Consultation;
  conditions: Conditions[] = [] as Conditions[];
  patients: Patient[] = [] as Patient[];
  errorMessages = getErrorMessage;


  constructor(private sharedService: SharedService, private consultationService: ConsultationService, private patientService: PatientService,
    private conditionService: ConditionService, private datePipe: DatePipe, private sweetalert: SweetalertService, private dialogRef: MatDialogRef<AddConsultationComponent>) { 
    this.consultationForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      diagnostic: new FormControl([] as Conditions[], [Validators.required]),
      comment: new FormControl(''),
      patientId: new FormControl('', [Validators.required])
    });
  }

  checkedChange(event: { checked: boolean, label: string}){
    this.conditions.find(condition => condition.name === event.label)!.checked = event.checked;
  }

  ngOnInit() {
    this.patientService.getPatients().subscribe(patients => {
      this.patients = patients;
      patients.sort((a, b) => a.name.localeCompare(b.name));
    });

    this.conditionService.getConditions().subscribe(conditions => {
      this.conditions = conditions;
      conditions.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  async addConsultation(){
    this.sharedService.setIsLoading(true);
    
    this.consultationForm.controls["diagnostic"].setValue(this.conditions.filter(condition => condition.checked));

    if (!this.consultationForm.valid) {
      this.sweetalert.error('Datos inválidos', 'Por favor, llene el formulario correctamente');
      this.sharedService.setIsLoading(false);
      return;
    }
    
    this.consultation = this.consultationForm.value;
    this.consultation.is_delete = false;
    
    await this.consultationService.addConsultation(this.consultation).then(response => {
      if (response) {
        this.sweetalert.success('Consulta agregada', 'La consulta se ha agregado correctamente').then(() => {
          this.dialogRef.close(true);
        });
      }
    }, () => this.sweetalert.error('Error', 'No se pudo agregar'))
    .catch(() => this.sweetalert.error('Error', 'No se pudo agregar'))
    .finally(() => this.sharedService.setIsLoading(false));
  }

}
