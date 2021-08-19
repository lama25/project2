import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent implements OnInit {

  cities:Object[] = [{id:1,name:'Jerusalem'},{id:2,name:'London'},{id:3,name:'Paris'},{id:4,name:'BongaRRRR'}]
  city:string;

  onSubmit(){
    this.router.navigate(['/temperatures',this.city]); 
  }

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
