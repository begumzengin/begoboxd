import { Component, OnDestroy } from '@angular/core';
import { Movie } from '../../movie';
import { MovieService } from '../../services/movie.service';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { MovieCardComponent } from '../movie-card/movie-card.component';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers: [MessageService, DialogService]
})
export class MovieListComponent {

  pageTitle: string = 'Popular Movies';
  movies: Movie[] = [];
  movie?: Movie;
  moviePoster?: any;

  constructor(
    private movieService: MovieService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) { }

  ref: DynamicDialogRef | undefined;

  gridData: number[] = [];
  
  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe(
      (movie: any) => {
        this.movies = movie.results;
      },
      (error) => {
        console.log('Error fetching movie:', error);
      }
    );
  }

  movieCardClicked(): void {
    console.log('Movie card clicked');
  }

  showMovieDetails(movie: Movie) {
    this.ref = this.dialogService.open(MovieCardComponent, {
      header: movie.title,
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      maximizable: true,   
    });

    this.ref.onClose.subscribe(() => {
      this.messageService.add({ severity: 'info', summary: '', detail: 'movie details closed' });
    });
  }

  ngOnDestroy() {
    if(this.ref){
      this.ref.close();
    }
  }

}
