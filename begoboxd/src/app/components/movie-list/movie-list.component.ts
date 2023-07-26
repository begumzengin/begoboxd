import { Component } from '@angular/core';
import { Movie } from '../../movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies: Movie[] = [];
  movie?: Movie;
  moviePoster?: any;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    //this.movieService.getMovies().subscribe(movies => this.movies = movies);
    this.movieService.getPopularMovies().subscribe(
      (movie: any) => {
        this.movies = movie.results;
      },
      (error) => {
        console.log('Error fetching movie:', error);
      }
    );
  }


}
