import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BooksService } from '../books.service';
import { Book } from '../interfaces/book';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  
  //books;
  books$; 
  books:Book[];
  userId:string; 
  editstate = [];
  addBookFormOPen = false;
  ;
  
  //Save first document in snapshot of items received
  firstDocumentArrived: any;

  //Save last document in snapshot of items received
  lastDocumentArrived:  any;
  
  //Keep the array of first document of previous pages
  prev_strt_at:  any[] = [];
    
  push_prev_startAt(prev_first_doc) {
     this.prev_strt_at.push(prev_first_doc);
  }
  
  remove_last_from_start_at(){
    this.prev_strt_at.splice(this.prev_strt_at.length-1, 1);
  }
  
  get_prev_startAt(){
      return this.prev_strt_at[this.prev_strt_at.length - 1];
  }

  panelOpenState = false;
  constructor(private booksService:BooksService, public authService:AuthService) { }

  deleteBook(id:string){
    this.booksService.deleteBook(this.userId,id); 
  }

  update(book:Book){
    this.booksService.updateBook(this.userId,book.id ,book.title, book.author);
  }

  add(book:Book){
    this.booksService.addBook(this.userId,book.title,book.author); 
  }

  nextPage(){
    this.books$ = this.booksService.nextPage(this.userId,this.lastDocumentArrived); 
    this.books$.subscribe(
      docs =>{
        this.lastDocumentArrived = docs[docs.length-1].payload.doc; 
        this.firstDocumentArrived = docs[0].payload.doc;
        this.push_prev_startAt(this.firstDocumentArrived);

        this.books = [];
        for(let document of docs){
          const book:Book = document.payload.doc.data();
          book.id = document.payload.doc.id; 
          this.books.push(book); 
        }
      }
    )     
  }

  prevPage(){
    this.remove_last_from_start_at()
    this.books$ = this.booksService.prevPage(this.userId,this.get_prev_startAt());
    this.books$.subscribe(docs => {   
      this.lastDocumentArrived = docs[docs.length-1].payload.doc; 
      this.firstDocumentArrived = docs[0].payload.doc;
      this.books = [];
        for (let document of docs) {
          const book:Book = document.payload.doc.data();
          book.id = document.payload.doc.id;
          this.books.push(book);
      }
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      user => {
        this.userId = user.uid;
        console.log(this.userId); 
        this.books$ = this.booksService.getBooks(this.userId); 
        
        this.books$.subscribe(
          docs =>{
            console.log('init worked');
            this.lastDocumentArrived = docs[docs.length-1].payload.doc;
            this.firstDocumentArrived = docs[0].payload.doc;
            this.push_prev_startAt(this.firstDocumentArrived);             
            this.books = [];
            for(let document of docs){
              const book:Book = document.payload.doc.data();
              book.id = document.payload.doc.id; 
              this.books.push(book); 
            }
          }
        ) 
      }
    )

  }

}
