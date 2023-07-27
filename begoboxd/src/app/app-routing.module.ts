import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';

const routes: Routes = [
  //{path: '', component: MovieListComponent},
  {path: 'about', component: AboutComponent},
  {path: 'popular-movies', component: MovieListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
