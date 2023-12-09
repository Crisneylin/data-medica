import { Component, Inject, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { SharedService } from 'src/app/services/shared.service';
import { PatientService } from '../../services/patient.service';
import { getErrorMessage } from 'src/app/components/util';
import { GenderEnum } from 'src/app/models/enum/gender.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ViewImageComponent } from 'src/app/components/view-image/view-image.component';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

  patientForm: FormGroup;
  patient: Patient = {} as Patient;
  errorMessages = getErrorMessage;
  file!: File;
  img: string = '';
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Patient, private sharedService: SharedService, private patientService: PatientService, private dialog: MatDialog,
    private datePipe: DatePipe, private sweetalert: SweetalertService, private dialogRef: MatDialogRef<EditPatientComponent>, private sweetAlert: SweetalertService) { 
      this.img = data.photo!;
      this.patient = data;
      this.patientForm = new FormGroup({
      identification: new FormControl(data.identification, [Validators.required, Validators.minLength(9), Validators.maxLength(11)]),
      name: new FormControl(data.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      lastname: new FormControl(data.lastname, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      age: new FormControl(data.age, [Validators.required,Validators.min(0),Validators.max(110),Validators.pattern('^[0-9]+$')]),
      gender: new FormControl(data.gender, [Validators.required, Validators.pattern(/^(Hombre|Mujer)$/i)]),
      email: new FormControl(data.email, [Validators.email]),
      phone: new FormControl(data.phone, [Validators.minLength(10), Validators.maxLength(10)]),
      address: new FormControl(data.address, [Validators.minLength(5), Validators.maxLength(100)]),
      photo: new FormControl(data.photo)
    });
  }

  ngOnInit() {
  }

  viewImage(){
    this.dialog.open(ViewImageComponent, {
      data: this.patient.photo,
      height: 'auto'
    })
  }

  onChange(event: NgxDropzoneChangeEvent){
    this.file = event.addedFiles[0];
    
    const reader = new FileReader();

    reader.onload = () => {
      this.patientForm.controls['photo'].setValue(reader.result as string);      
    };
    
    reader.readAsDataURL(this.file);
  }

  onRemove(){
    this.file = null!;
  }

  async editPatient(){
    this.sharedService.setIsLoading(true);

    if (!this.patientForm.valid) {
      this.sweetAlert.error('Datos inválidos', 'Por favor, llene el formulario correctamente');
      this.sharedService.setIsLoading(false);
      return;
    }
    
    this.patient = this.patientForm.value;
    this.patient.id = this.data.id;
    
    console.log(this.patient);
    
    await this.patientService.updatePatient(this.patient).then(response => {
      this.sweetAlert.success('Paciente Editado', 'El paciente se ha editado correctamente').then(() => {
        this.dialogRef.close(true);
      });
    })
    .catch(() => {
      this.sharedService.setIsLoading(false);
      this.sweetAlert.error('Error', 'No se pudo editar')
    }).finally(() => this.sharedService.setIsLoading(false));
  }
}
