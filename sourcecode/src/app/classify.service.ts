import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassifyService {
  private url = "https://4nedl0jfa0.execute-api.us-east-1.amazonaws.com/beta";

  categories:object = {0:'Business', 1:'Entertainment', 2:'Politics', 3:'Sport', 4:'Tech'};

  classify(text:string){
    let json = {'articles':[
      {'text':text}
    ]}
    let body = JSON.stringify(json);
    return this.http.post<any>(this.url, body).pipe(
      map(res => {
        console.log(res);
        let final:string = res.body;
        console.log(final);
        final = final.replace('[',''); 
        final = final.replace(']','');
        return final; 
      })
    )

  }

  constructor(private http:HttpClient) { }
}
