import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { CityFormComponent } from './city-form/city-form.component';
import { ClassifyComponent } from './classify/classify.component';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TemperaturesComponent } from './temperatures/temperatures.component';
import { HelloComponent } from './hello/hello.component';
import { PatientsComponent } from './patients/patients.component';


const routes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: 'temperatures/:city', component: TemperaturesComponent },
  { path: 'classify/:network', component: ClassifyComponent },
  { path: 'city', component: CityFormComponent }, 
  { path: 'posts', component: PostsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'hello', component: HelloComponent},
  { path: '', component: HelloComponent},
  { path: 'patients', component: PatientsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
