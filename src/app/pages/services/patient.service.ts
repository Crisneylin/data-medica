import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Observable, finalize, map } from 'rxjs';
import { Patient } from 'src/app/models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  patientRef;

  constructor(private firestore: Firestore) { 
    this.patientRef = collection(firestore, 'patients');
  }

  async addPatient(patient: Patient): Promise<any>{
    return addDoc(this.patientRef, patient);
  }

  // getPatients(): Observable<Patient[]>{
  //   return collectionData(this.patientRef, {idField: 'id'}) as Observable<Patient[]>;
  // } 

  getPatients(): Observable<Patient[]>{
    return collectionData(this.patientRef, {idField: 'id'}).pipe(
      map(patients => patients.filter(patient => !(patient as Patient).is_delete))
    ) as Observable<Patient[]>;
  } 

  async getPatientById(patientId: string): Promise<Patient>{
    const patientRefById = doc(this.firestore, `patients/${patientId}`); 
    return (await getDoc(patientRefById)).data() as Patient;
  }

  async getPatientsIsActive(): Promise<Patient[]>{
    const result = await collectionData(this.patientRef, { idField: 'id' }).toPromise();    
    return result ? result.filter(patient => (patient as Patient).is_delete === false) as Patient[] : [];
  }

  deletePatient(patientId: string): Promise<any>{
    const patientRefDelete = doc(this.firestore, `patients/${patientId}`);
    return updateDoc(patientRefDelete, { is_delete: true });
  }

  updatePatient(patient: Patient): Promise<any>{
    const patientRefUpdate = doc(this.firestore, `patients/${patient.id}`);
    return updateDoc(patientRefUpdate, patient as any);
  }

}
