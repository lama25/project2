import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../interfaces/book';

@Component({
  selector: 'bookform',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  @Input() title:string;  
  @Input() author:string; 
  @Input() id:string; 
  @Input() formType:string;
  @Output() update = new EventEmitter<Book>();
  @Output() closeEdit = new EventEmitter<null>();
   
  updateParent(){
    let book:Book = {id:this.id, title:this.title, author:this.author};
    this.update.emit(book); 
    if(this.formType == "Add book"){
      this.title  = null;
      this.author = null; 
    }
  }

  tellParentToClose(){
    this.closeEdit.emit(); 
  }


  constructor() { }

  ngOnInit(): void {
  }

}
