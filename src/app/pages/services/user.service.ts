import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userRef;

  constructor(private firestore: Firestore) { 
    this.userRef = collection(firestore, 'user');
  }

  async addUser(user: User): Promise<any>{    
    return addDoc(this.userRef, user);
  }


}
