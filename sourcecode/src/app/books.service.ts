import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class BooksService {


  books = [{title:'Alice in Wonderland', author:'Lewis Carrol', summary:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"},
  {title:'War and Peace', author:'Leo Tolstoy', summary:"of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in"},
  {title:'The Magic Mountain', author:'Thomas Mann', summary:"the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}];

  public addBooks(){
    setInterval(()=>this.books.push({title:'A new one',author:'New author',summary:'Short summary'}),2000);
  }
  
  /*
  public getBooks(){
    const booksObservable = new Observable(obs => {
      setInterval(()=>obs.next(this.books),500)
    });
    return booksObservable;  
  } 
 */ 

  bookCollection:AngularFirestoreCollection;
  userCollection:AngularFirestoreCollection = this.db.collection('users'); 
  
  public getBooks(userId){
    this.bookCollection = this.db.collection(`users/${userId}/books`, 
    ref => ref.orderBy('title', 'asc').limit(4)); 
    return this.bookCollection.snapshotChanges()      
  } 

  nextPage(userId,startAfter): Observable<any[]>{
    this.bookCollection = this.db.collection(`users/${userId}/books`, 
    ref => ref.limit(4).orderBy('title', 'asc')
      .startAfter(startAfter))    
    return this.bookCollection.snapshotChanges();
  }
  
  prevPage(userId,startAt): Observable<any[]>{
    this.bookCollection = this.db.collection(`users/${userId}/books`, 
    ref => ref.limit(4).orderBy('title', 'asc')
      .startAt(startAt))    
    return this.bookCollection.snapshotChanges();
  }



  /*
  public getBooks(userId){
    this.bookCollection = this.db.collection(`users/${userId}/books`); 
    return this.bookCollection.snapshotChanges().pipe(map(
      collection =>collection.map(
        document => {
          const data = document.payload.doc.data(); 
          data.id = document.payload.doc.id;
          return data; 
        }
      )
    ))      
  } */

  deleteBook(Userid:string, id:string){
    this.db.doc(`users/${Userid}/books/${id}`).delete(); 
  } 

  addBook(userId:string,title:string,author:string){
    const book = {title:title, author:author}; 
    this.userCollection.doc(userId).collection('books').add(book);
  }

  updateBook(userId:string,id:string,title:string,author:string){
    this.db.doc(`users/${userId}/books/${id}`).update(
      {
        title:title,
        author:author
      }
    )
  }

  /*
  public getBooks(){
    return this.books;  
  }
  */

  

  /*
  getBooks(userId):Observable<any[]>{
    
  }
  */
  
  //constructor(private db:AngularFirestore) { }
  
  
  
  
  constructor(private db:AngularFirestore) { }



}
