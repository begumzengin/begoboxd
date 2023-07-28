import { Component, Input, inject } from '@angular/core';
import { Movie } from '../../movie';
import { MovieService } from 'src/app/services/movie.service';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  movieService: MovieService=inject(MovieService);
  tvService: TvService=inject(TvService);
  isFavorite: boolean = false;

  private storageKey = 'user-fave-movie';

  movieImageResponse: any;
  @Input() index?: number;

  @Input() movie: Movie = {
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 346698,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0
  }

  ngOnInit(): void {
    this.getImage();
    
  }

  getImage(){
    this.movieService.getMoviePoster(this.movie.id).subscribe(
      (data : any) => {this.movieImageResponse = data},
    );
  }

  getMoviePosterUrl(): string {
    // Check if the response contains posters and get the first poster path if available
    if (this.movieImageResponse && this.movieImageResponse && this.movieImageResponse.posters.length > 0) {

      const baseUrl = 'https://image.tmdb.org/t/p/original';
      const posterPath = this.movieImageResponse.posters[0].file_path;
      return baseUrl + posterPath;
    } else {
      // Return a default placeholder image URL or handle no poster case
      return "https://www.w3schools.com/images/w3schools_green.jpg";
    }
  }

  saveFavorite(movie: Movie){
    let userFaveMovies: Movie[] = [];

    const favoritesJson = localStorage.getItem('favoriteMovies');
    if (favoritesJson) {
      userFaveMovies = JSON.parse(favoritesJson);
    }

    const isMovieInFavorites = userFaveMovies.some((favMovie) => favMovie.id === movie.id);

    if (!isMovieInFavorites) {
      userFaveMovies.push(movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(userFaveMovies));
      console.log('Movie added to favorites:', movie);
    } else {
      console.log('Movie is already in favorites:', movie);
    }


    // const movieJson = JSON.stringify(movie);
    // localStorage.setItem(this.storageKey, movieJson);
    // console.log('Movie stored in local storage:', movie);
    
  }

}
