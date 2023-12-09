import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Conditions } from 'src/app/models/conditions';
import { Consultation } from 'src/app/models/consultation';
import { Patient } from 'src/app/models/patient';
import { SharedService } from 'src/app/services/shared.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { ConditionService } from '../../services/condition.service';
import { PatientService } from '../../services/patient.service';
import { ConsultationService } from '../../services/consultation.service';

@Component({
  selector: 'app-edit-consultation',
  templateUrl: './edit-consultation.component.html',
  styleUrls: ['./edit-consultation.component.css']
})
export class EditConsultationComponent implements OnInit {

  consultation: Consultation = {} as Consultation;
  conditions: Conditions[] = [] as Conditions[];
  patients: Patient[] = [] as Patient[];
  consultationForm!: FormGroup;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Consultation, private sharedService: SharedService, private sweetAlert: SweetalertService,
  private dialogRef: MatDialogRef<EditConsultationComponent>, private conditionService: ConditionService, private patientService: PatientService,
  private consultationService: ConsultationService) { 
    
    this.consultationForm = new FormGroup({
      date: new FormControl(data.date, [Validators.required]),
      diagnostic: new FormControl(data.diagnostic, [Validators.required]),
      comment: new FormControl(data.comment),
      patientId: new FormControl(data.patientId, [Validators.required])
    });
  }

  ngOnInit() {
    this.consultation = this.data;
    this.patientService.getPatients().subscribe(patients => {
      this.patients = patients;
      patients.sort((a, b) => a.name.localeCompare(b.name));
    });

    this.conditionService.getConditions().subscribe(conditions => {
      this.conditions = conditions;
      conditions.sort((a, b) => a.name.localeCompare(b.name));
      conditions.forEach(condition => {
        if (this.consultation.diagnostic?.find(diagnostic => diagnostic.id == condition.id)) {        
          condition.checked = true;
        }
      });
    });
  }
  checkedChange(event: { checked: boolean, label: string}){
    this.conditions.find(condition => condition.name === event.label)!.checked = event.checked;
  }




  async editConsultation(){
    this.sharedService.setIsLoading(true);
    
    this.consultationForm.controls["diagnostic"].setValue(this.conditions.filter(condition => condition.checked));

    if (!this.consultationForm.valid) {
      this.sweetAlert.error('Datos inválidos', 'Por favor, llene el formulario correctamente');
      this.sharedService.setIsLoading(false);
      return;
    }
    
    this.consultation = this.consultationForm.value;
    this.consultation.id = this.data.id;
    
    await this.consultationService.updateConsultation(this.consultation).then(response => {
      this.sweetAlert.success('Consulta Editada', 'La consulta se ha editado correctamente').then(() => {
        this.dialogRef.close(true);
      });
    })
    .catch(() => {
      this.sharedService.setIsLoading(false);
      this.sweetAlert.error('Error', 'No se pudo editar')
    })
    .finally(() => this.sharedService.setIsLoading(false));
  }
}
