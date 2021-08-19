import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PatientsService } from '../patients.service';
import { Patient } from '../interfaces/patient';
import { PredictionService } from '../prediction.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  userId;

  patients:Patient[];
  patients$;
  addPatientFormOpen;
  rowToEdit:number = -1; 
  PatientToEdit:Patient = {radius:null,
      texture:null,
      perimeter:null,
      area:null,
      smoothness:null,
      name:null
      };

  add(Patient:Patient){
    this.patientsService.addPatient(this.userId, Patient.radius, Patient.texture, Patient.perimeter,Patient.area,Patient.smoothness,Patient.name)
  }
  
  moveToEditState(index){
    console.log(this.patients[index].radius);
    this.PatientToEdit.name = this.patients[index].name;

    this.PatientToEdit.radius = this.patients[index].radius;
    this.PatientToEdit.texture = this.patients[index].texture;
    this.PatientToEdit.perimeter = this.patients[index].perimeter;
    this.PatientToEdit.area = this.patients[index].area;

    this.PatientToEdit.smoothness = this.patients[index].smoothness;

    this.rowToEdit = index; 
  }

  updatePatient(){
    let id = this.patients[this.rowToEdit].id;
    this.patientsService.updatePatient(this.userId,id, this.PatientToEdit.radius,this.PatientToEdit.texture,this.PatientToEdit.perimeter
      ,this.PatientToEdit.area,this.PatientToEdit.smoothness,this.PatientToEdit.name);
    this.rowToEdit = null;
  }

  deletePatient(index){
    let id = this.patients[index].id;
    this.patientsService.deletePatient(this.userId, id);
  }

  updateResult(index){
    this.patients[index].saved = true; 
    this.patientsService.updateRsult(this.userId,this.patients[index].id,this.patients[index].result);
  }

  predict(index){
    this.patients[index].result = 'waiting for results';
    this.predictionService.predict(this.patients[index].radius,
       this.patients[index].texture,
       this.patients[index].perimeter,
       this.patients[index].area,
       this.patients[index].smoothness).subscribe(
      res => {console.log(res);
        if(res == 0){
          var result = 'no';
        } 
        else if (res == 1){
          var result = 'yes'
        }else{
          var result = 'server down';
        }
        this.patients[index].result = result}
    );  
  }

  displayedColumns: string[] = ['name', 'radius', 'texture', 'perimeter', 'area', 'smoothness', 'Delete', 'Edit', 'Predict', 'Result'];
 
  constructor(private patientsService:PatientsService,
    private authService:AuthService,
    private predictionService:PredictionService ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      user => {
          this.userId = user.uid;
          console.log(user.uid);
          this.patients$ = this.patientsService.getPatients(this.userId);
          this.patients$.subscribe(
            docs => {         
              this.patients = [];
              var i = 0;
              for (let document of docs) {
                console.log(i++); 
                const Patient:Patient = document.payload.doc.data();
                if(Patient.result){
                  Patient.saved = true; 
                }
                Patient.id = document.payload.doc.id;
                   this.patients.push(Patient); 
              }                        
            }
          )
      })
  }   
}
