import { ImageService } from './../image.service';
import { ClassifyService } from './../classify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.css']
})
export class ClassifyComponent implements OnInit {
  
  favoriteSeason: string;
  selectedNetwork; 
  networks: string[] = ['BBC', 'CNN', 'NBC'];
  text:string; 
  category:string = 'No category';
  categoryImage:string;  
  
  classify(){
    this.classifyService.classify(this.text).subscribe(
      res => {
        console.log(res);
        this.category = this.classifyService.categories[res];
        this.categoryImage = this.imageService.images[res];  
      }
    )
  }

  constructor(private route:ActivatedRoute, 
              private classifyService:ClassifyService,
              private imageService:ImageService) { }

  ngOnInit(): void {
    this.selectedNetwork = this.route.snapshot.params.network;
  }



}
