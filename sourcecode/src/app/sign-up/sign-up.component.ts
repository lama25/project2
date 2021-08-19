import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email:string;
  password:string; 
  errorMessage:string; 
  isError:boolean = false; 
  
  constructor(private authService:AuthService, private router:Router) { }

  onSubmit(){
    this.authService.SignUp(this.email,this.password).then(
      res =>{
        console.log('Succesful login;');
        this.router.navigate(['/hello']); 
      }
    ).catch(
      err => {
        console.log(err);
        this.isError = true; 
        this.errorMessage = err.message; 
      } 
    ) 
  }


  
  ngOnInit(): void {
  }

}
