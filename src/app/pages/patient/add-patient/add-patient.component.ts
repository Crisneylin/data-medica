import { Component, OnInit } from '@angular/core';
import { GenderEnum } from 'src/app/models/enum/gender.enum';
import { Patient } from 'src/app/models/patient';
import { SharedService } from 'src/app/services/shared.service';
import { PatientService } from '../../services/patient.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { getErrorMessage } from 'src/app/components/util';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  patientForm: FormGroup;
  patient: Patient = {} as Patient;
  errorMessages = getErrorMessage;
  file!: File;
  img: string = '';


  constructor(private sharedService: SharedService, private patientService: PatientService, 
    private datePipe: DatePipe, private sweetalert: SweetalertService, private dialogRef: MatDialogRef<AddPatientComponent>) { 
    this.patientForm = new FormGroup({
      identification: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(11)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      age: new FormControl(null, [Validators.required,Validators.min(0),Validators.max(110),Validators.pattern('^[0-9]+$')]),
      gender: new FormControl(GenderEnum.Man, [Validators.required, Validators.pattern(/^(Hombre|Mujer)$/i)]),
      email: new FormControl('', [Validators.email]),
      phone: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
      address: new FormControl('', [Validators.minLength(5), Validators.maxLength(100)]),
      photo: new FormControl('')
    });
  }

  ngOnInit() {

  }

  myCustomFunc(event: any){
    console.log(event);
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

  async addPatient(){
    this.sharedService.setIsLoading(true);
    
    if (!this.patientForm.valid) {
      this.sweetalert.error('Datos inválidos', 'Por favor, llene el formulario correctamente');
      this.sharedService.setIsLoading(false);
      return;
    }
    
    this.patient = this.patientForm.value;
    this.patient.created_at = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')!;

    await this.patientService.addPatient(this.patient).then(response => {
      if (response) {
        this.sweetalert.success('Paciente agregado', 'El paciente se ha agregado correctamente').then(() => {
          this.dialogRef.close(true);
        });
      }
    }, () => this.sweetalert.error('Error', 'No se pudo agregar el paciente'))
    .catch(() => this.sweetalert.error('Error', 'No se pudo agregar el paciente'))
    .finally(() => this.sharedService.setIsLoading(false));
  }

}
