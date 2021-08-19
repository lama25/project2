import { Component, OnInit, Input,  Output, EventEmitter } from '@angular/core';
import { Patient } from '../interfaces/patient';

@Component({
  selector: 'patientform',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
  //@Input() book: Book;
  @Input() radius: number;
  @Input() texture: number;
  @Input() perimeter: number;
  @Input() area: number;
  @Input() smoothness: number;
  @Input() name: string;

  @Input() id: string;
  @Input() formType: string;
  
  @Output() update = new EventEmitter<Patient>();
  @Output() closeEdit = new EventEmitter<null>();

  buttonText:String = 'Add patient'; 
  
  onSubmit(){ 

  }  

  tellParentToClose(){
    this.closeEdit.emit();
  }
  
  updateParent(){
    let patient:Patient = {id:this.id,radius:this.radius, texture:this.texture,perimeter:this.perimeter,area:this.area,smoothness:this.smoothness, name:this.name}; 
    
    this.update.emit(patient);
    if(this.formType == 'Add patient'){
      this.radius = null;
      this.perimeter = null;
      this.texture = null;
      this.area = null,
      this.smoothness = null;
      this.name = null
      this.closeEdit.emit();
    }
  }

  constructor() { }


  ngOnInit(): void {
    if(this.formType == 'Add patient'){
      this.buttonText = 'Add';
    }
  }

}
