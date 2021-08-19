import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Patient } from './interfaces/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

userCollection:AngularFirestoreCollection = this.db.collection('users');
PatientsCollection:AngularFirestoreCollection;

getPatients(userId): Observable<any[]> {
  this.PatientsCollection = this.db.collection(`users/${userId}/Patients`, 
     ref => ref.limit(10))
  return this.PatientsCollection.snapshotChanges();    
} 

updateRsult(userId:string, id:string,result:string){
  this.db.doc(`users/${userId}/Patients/${id}`).update(
    {
      result:result
    })
  }

updatePatient(userId:string, id:string,radius:number,texture:number,perimeter:number, area: number, smoothness: number, name:string){
  this.db.doc(`users/${userId}/Patients/${id}`).update(
    {
      radius:radius,
      texture:texture,
      perimeter:perimeter,
      area:area,
      smoothness:smoothness,
      name:name,
      result:null
    }
  )
}

deletePatient(userId:string, id:string){
  this.db.doc(`users/${userId}/Patients/${id}`).delete();
}

addPatient(userId:string, radius:number, texture:number, perimeter:number, area: number, smoothness: number, name:string){
  const Patient:Patient = {
    radius:radius,
    texture:texture,
    perimeter:perimeter,
    area:area,
    smoothness:smoothness,
    name:name
    }
  this.userCollection.doc(userId).collection('Patients').add(Patient);
} 



constructor(private db: AngularFirestore,
  ) {} 

}

