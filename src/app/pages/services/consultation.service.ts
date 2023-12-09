import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Observable, finalize, map } from 'rxjs';
import { Consultation } from 'src/app/models/consultation';
@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  consultationRef;

  constructor(private firestore: Firestore) { 
    this.consultationRef = collection(firestore, 'consultations');
  }

  async addConsultation(consultation: Consultation): Promise<any>{
    return addDoc(this.consultationRef, consultation);
  }

  getConsultation(): Observable<Consultation[]>{
    return collectionData(this.consultationRef, {idField: 'id'}).pipe(
      map(consultations => consultations.filter(consultation => !(consultation as Consultation).is_delete))
    ) as Observable<Consultation[]>;
  } 

  async getConsultationById(consultationId: string): Promise<Consultation>{
    const consultationRefById = doc(this.firestore, `consultations/${consultationId}`); 
    return (await getDoc(consultationRefById)).data() as Consultation;
  }

  async getConsultationsIsActive(): Promise<Consultation[]>{
    const result = await collectionData(this.consultationRef, { idField: 'id' }).toPromise();    
    return result ? result.filter(consultation => (consultation as Consultation).is_delete === false) as Consultation[] : [];
  }

  deleteConsultations(consultationId: string): Promise<any>{
    const consultationRefDelete = doc(this.firestore, `consultations/${consultationId}`);
    return updateDoc(consultationRefDelete, { is_delete: true });
  }

  updateConsultation(consultation: Consultation): Promise<any>{
    const consultationRefUpdate = doc(this.firestore, `consultations/${consultation.id}`);    
    return updateDoc(consultationRefUpdate, consultation as any);
  }

}
