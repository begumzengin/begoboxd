import { Component, inject, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Movie } from 'src/app/movie';
import { MovieService } from 'src/app/services/movie.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  // searchQuery: string = '';
  // searchResults: Movie[] = [];
  movies$!: Observable<Movie[]>;
  searchTerms = new Subject<string>();
  selectedMovie?: Movie;
  
  movieService: MovieService=inject(MovieService);
  //isSearched: boolean = false;

  search(term: string): void {
    this.searchTerms.next(term);
    console.log(term);
  }

  ngOnInit(): void {
    this.movies$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.movieService.searchMovies(term)),
    );
  }
}
