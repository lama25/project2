import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'; 


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';




import { MatListModule } from '@angular/material/list';
import { TemperaturesComponent } from './temperatures/temperatures.component';
import { ClassifyComponent } from './classify/classify.component';


import { HttpClientModule } from '@angular/common/http';
import { CityFormComponent } from './city-form/city-form.component';
import { PostsComponent } from './posts/posts.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { BookFormComponent } from './book-form/book-form.component';
//import { PatientsComponent } from './patients/patients.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { HelloComponent } from './hello/hello.component';
import { PatientsComponent } from './patients/patients.component'; 


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    NavComponent,
    TemperaturesComponent,
    ClassifyComponent,
    CityFormComponent,
    PostsComponent,
    LoginComponent,
    SignUpComponent,
    BookFormComponent,
    //PatientsComponent,
    PatientFormComponent,
    HelloComponent,
    PatientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
