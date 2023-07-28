import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { TvListComponent } from './components/tv-list/tv-list.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

const routes: Routes = [
  //{path: '', component: MovieListComponent},
  {path: 'about', component: AboutComponent},
  {path: 'popular-movies', component: MovieListComponent},
  {path: 'popular-tv', component: TvListComponent},
  { path: 'search', component: SearchComponent },
  {path: '', component: HomeComponent},
  {path: 'favorite', component: FavoriteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
