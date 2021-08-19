import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private path:string = 'https://firebasestorage.googleapis.com/v0/b/hello-c321a.appspot.com/o/'; 
  public images:string[] = [];
  constructor() {
    this.images[0] = this.path + 'biz.JPG' + '?alt=media&token=ab9c5cda-4ff3-421d-9938-8bc7ebd42822';
    this.images[1] = this.path + 'entermnt.JPG' + '?alt=media&token=74173480-ab6c-47ec-b5b3-49ac276cdb17';
    this.images[2] = this.path + 'politics-icon.png' + '?alt=media&token=da4542d7-8834-4986-870b-fc9978959b82';
    this.images[3] = this.path + 'sport.JPG' + '?alt=media&token=0cf8b944-1232-44b7-9257-bf534a00f443'; 
    this.images[4] = this.path + 'tech.JPG' + '?alt=media&token=5a19447f-4543-4878-968d-9cdc724c8487';
   }
}
