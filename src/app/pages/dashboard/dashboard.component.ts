import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Observable, count } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { Chart } from 'chart.js';
import { ConsultationService } from '../services/consultation.service';
import { PatientService } from '../services/patient.service';
import { Patient } from 'src/app/models/patient';
import { Consultation } from 'src/app/models/consultation';
import { Conditions } from 'src/app/models/conditions';
import { ConditionService } from '../services/condition.service';
import { GenderEnum } from 'src/app/models/enum/gender.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {

  user$!: Observable<User | null>;
  patients: Patient[] = [] as Patient[];
  consultations: Consultation[] = [] as Consultation[];
  topConditionConsultation: Conditions[] = [] as Conditions[];
  conditions: Conditions[] = [] as Conditions[];
  genderEnum!: GenderEnum;

  constructor(private sharedService: SharedService, private authService: AuthService, private consultationService: ConsultationService, 
  private patientService: PatientService, private conditionService: ConditionService) { }

  async ngOnInit() {
    this.sharedService.setMemuHeaderTitle('Panel de control');

    this.user$ = this.authService.userState$;

    await this.getData().then(() => {
      console.log('data');
    });
    
  }
  
  async getData(){
    this.patientService.getPatients().subscribe(patients => {
      this.patients = patients;
      this.consultationService.getConsultation().subscribe(consultation => {
        this.consultations = consultation;
        this.conditionService.getConditions().subscribe(conditions => {
          this.conditions = conditions;
          this.getTopConditionConsultation();
        });
      });
    });
    

  }
  
  getTopConditionConsultation() {    
    const topCondition: { conditionName: string; count: number }[] = [];
    const conditionCount: { [conditionName: string]: number } = {};

    // Iterar a través de las consultas y contar las condiciones
    this.consultations.forEach(consultation => {
        if (consultation.diagnostic) {
            consultation.diagnostic.forEach(condition => {
                const conditionName = condition.name.toLowerCase(); // Considera la comparación sin distinción entre mayúsculas y minúsculas
                conditionCount[conditionName] = (conditionCount[conditionName] || 0) + 1;
            });
        }
    });
    // Ordenar las condiciones por frecuencia descendente
    const sortedConditions = Object.keys(conditionCount).sort((a, b) => conditionCount[b] - conditionCount[a]);

    // Obtener las 3 condiciones más frecuentes
    sortedConditions.forEach(conditionName => {
      topCondition.push({ conditionName, count: conditionCount[conditionName] });
    });
    return [...topCondition, ...topCondition, ...topCondition];
  }

  countPatientGender(gender:string){
    let count = 0;
    this.patients.forEach((patient) => {
      patient.gender == gender ? count++ : count;
    });
    return count;
  }
  
  getAgeAverage(){
    let count = 0;
    this.patients.forEach((patient) => {
      count += patient.age;
    });
    return count / this.patients.length;
  }

  getAgeRange(){
    return [
      { min: 0, max: 20 },
      { min: 21, max: 40 },
      { min: 41, max: 60 },
      { min: 61, max: 80 },
      { min: 81, max: 100 },
      { min: 101, max: 120}
    ]
  }

  countPatientAge(ageMin:number, ageMax:number){
    let count = 0;
    this.patients.forEach((patient) => {
      patient.age >= ageMin && patient.age <= ageMax ? count++ : count;
    });
    return count;

  }
  
}
