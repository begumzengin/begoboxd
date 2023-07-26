import { Component } from '@angular/core';
import { Movie } from '../../movie';
import { MOVIES } from 'src/app/mock-movies';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies: Movie[] = MOVIES;

}
