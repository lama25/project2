import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  url = 'https://0l8jewg8y4.execute-api.us-east-1.amazonaws.com/beta'; 
  
  predict(radius:number, texture:number, perimeter:number, area: number, smoothness: number):Observable<any>{
    let json = {
       
        
          "radius": radius,
          "texture": texture,
          "perimeter": perimeter,
          "area": area,
          "smoothness":smoothness
        
    }
    let body  = JSON.stringify(json);
    console.log("in predict");
    return this.http.post<any>(this.url,body).pipe(
      map(res => {
        console.log("in the map"); 
        console.log(res);
        console.log(res.body);
        return res.body;       
      })
    );      
  }

  
  constructor(private http: HttpClient) { }
}
