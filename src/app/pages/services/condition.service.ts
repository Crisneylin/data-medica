import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Conditions } from 'src/app/models/conditions';
import { Consultation } from 'src/app/models/consultation';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  conditionRef;

  constructor(private firestore: Firestore) { 
    this.conditionRef = collection(firestore, 'conditions');
  }

  async addCondition(condition: Conditions): Promise<any>{
    return addDoc(this.conditionRef, condition);
  }
  
  getConditions(): Observable<Conditions[]>{
    return collectionData(this.conditionRef, {idField: 'id'}).pipe(
      map(conditions => conditions.filter(condition => !(condition as Conditions).is_delete))
    ) as Observable<Conditions[]>;
  } 

  async getConditionById(conditionId: string): Promise<Conditions>{
    const conditionRefById = doc(this.firestore, `conditions/${conditionId}`); 
    return (await getDoc(conditionRefById)).data() as Conditions;
  }

  async getConditionsIsActive(): Promise<Conditions[]>{
    const result = await collectionData(this.conditionRef, { idField: 'id' }).toPromise();    
    return result ? result.filter(patient => (patient as Conditions).is_delete === false) as Conditions[] : [];
  }

  deleteCondition(conditionId: string): Promise<any>{
    const conditionRefDelete = doc(this.firestore, `conditions/${conditionId}`);
    return updateDoc(conditionRefDelete, { is_delete: true });
  }

  updateCondition(condition: Conditions): Promise<any>{
    const conditionRefUpdate = doc(this.firestore, `conditions/${condition.id}`);
    return updateDoc(conditionRefUpdate, condition as any);
  }

}
