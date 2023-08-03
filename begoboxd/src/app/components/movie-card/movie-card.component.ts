import { ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { Movie } from '../../movie';
import { MovieService } from 'src/app/services/movie.service';
import { TvService } from 'src/app/services/tv.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  movieService: MovieService=inject(MovieService);
  tvService: TvService=inject(TvService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  messageService: MessageService = inject(MessageService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  isMovieInFavorites: boolean = false;
  userFaveMovies: Movie[] = [];
  favoriteMovies: { [key: number]: boolean } = {};

  constructor() {
    const favoritesJson = localStorage.getItem('favoriteMovies');
    if (favoritesJson) {
      this.userFaveMovies = JSON.parse(favoritesJson);
    }
  }

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

  saveFavorite(movie: Movie) {
    
    this.confirmationService.confirm({
      message: 'are you sure you want to add this movie to your favorites?',
      header: 'confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'yes',
      rejectLabel: 'no',
      accept: () => {

        const favoritesJson = localStorage.getItem('favoriteMovies');
        if (favoritesJson) {
          this.userFaveMovies = JSON.parse(favoritesJson);
        }

        this.isMovieInFavorites = this.userFaveMovies.some((favMovie) => favMovie.id === movie.id);

        if (!this.isMovieInFavorites) {
          this.userFaveMovies.push(movie);
          localStorage.setItem('favoriteMovies', JSON.stringify(this.userFaveMovies));
          console.log('Movie added to favorites:', movie);
          this.confirmationService.close();
          this.messageService.add({ severity: 'info', summary: 'confirmed', detail: 'you have added this movie to your favorites' });
        } else {
          console.log('Movie is already in favorites:', movie);
          this.confirmationService.close();
          this.messageService.add({ severity: 'info', summary: '', detail: 'this movie is already in your favorites' });
        }

        
      },
      reject: () => {
        console.log('Movie not added to favorites:', movie);

        this.confirmationService.close();
        this.messageService.add({ severity: 'info', summary: 'confirmed', detail: 'the movie was not added to your favorites' });
      },
    });
    
  }

  // isMovieFavorite(movie: Movie): boolean {
  //   const favoritesJson = JSON.parse(localStorage.getItem('favoriteMovies')!);
  //   if(favoritesJson.some((favMovie: any) => favMovie.id === movie.id)){
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  isMovieFavorite(movie: Movie): boolean {
    const favoritesJson = JSON.parse(localStorage.getItem('favoriteMovies')!) ?? [];
    return favoritesJson.some((favMovie: any) => favMovie.id === movie.id);
  }  

  removeFavorite(movie: Movie) {
    this.confirmationService.confirm({
      message: 'are you sure you want to remove this movie from your favorites?',
      header: 'confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'yes',
      rejectLabel: 'no',
      accept: () => {

        const favoritesJson = localStorage.getItem('favoriteMovies');
        if (favoritesJson) {
          this.userFaveMovies = JSON.parse(favoritesJson);
        }

        this.isMovieInFavorites = this.userFaveMovies.some((favMovie) => favMovie.id === movie.id);

        if (this.isMovieInFavorites) {
          this.userFaveMovies = this.userFaveMovies.filter((favMovie) => favMovie.id !== movie.id);
          localStorage.setItem('favoriteMovies', JSON.stringify(this.userFaveMovies));
          console.log('Movie removed from favorites:', movie);
          this.confirmationService.close();
          this.messageService.add({ severity: 'info', summary: 'confirmed', detail: 'you have removed this movie from your favorites' });
        } else {
          console.log('Movie is not in favorites:', movie);
          this.confirmationService.close();
          this.messageService.add({ severity: 'info', summary: '', detail: 'this movie is not in your favorites' });
        }

        
      },
      reject: () => {
        console.log('Movie not removed from favorites:', movie);

        this.confirmationService.close();
        this.messageService.add({ severity: 'info', summary: 'confirmed', detail: 'the movie was not removed from your favorites' });
      },
    });
  }

  toggleFavorite(movie: Movie) {

    if (this.isMovieFavorite(movie)) {
     this.removeFavorite(movie);
     localStorage.getItem('favoriteMovies');
    } else {
      if (!this.isMovieFavorite(movie)) {
        this.saveFavorite(movie);
        localStorage.getItem('favoriteMovies');
      }
    }
  }

}
