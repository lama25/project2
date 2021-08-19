import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts$:Observable<Post>
  constructor(private postsService:PostsService) { }

  ngOnInit(): void {
    this.posts$ = this.postsService.getPosts(); 
  }


}
