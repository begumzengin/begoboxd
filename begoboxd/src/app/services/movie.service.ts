import { Injectable } from '@angular/core';
import { Movie } from '../movie';
import { Observable, catchError, of } from 'rxjs';
import { MOVIES } from '../mock-movies';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    accept: 'application/json',
    Authorization: 'Bearer 7c16770da7981cc9c39b3d15a0a331bb'
  })
}

@Injectable({
  providedIn: 'root'
})


export class MovieService {

  private apiUrl = "https://api.themoviedb.org/3/movie/1705?api_key=7c16770da7981cc9c39b3d15a0a331bb";
  private readonly apiKey = '7c16770da7981cc9c39b3d15a0a331bb';
  private readonly baseUrl = 'https://api.themoviedb.org/3/movie/popular';

  constructor(private http:HttpClient) { }

  getMovies(): Observable<Movie[]> {


    // const movies = of(MOVIES);
    // //turned into an observable

    // return movies;

    return this.http.get<Movie[]>(this.apiUrl, httpOptions);
  }

  getPopularMovies(): Observable<Movie[]> {
    const url = `${this.baseUrl}/?api_key=${this.apiKey}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    return this.http.get<Movie[]>(url, { headers });
  }

  getMoviePoster(id: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${this.apiKey}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    });

    return this.http.get<any>(url, { headers });
  }

  searchMovies(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      return of([]);
    }

    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${term}`;

    return this.http.get<{ results: Movie[] }>(url).pipe(
      catchError(this.handleError<Movie[]>('searchMovies', []))
    );
  }

  handleError<T>(arg0: string, arg1: never[]): (err: any, caught: Observable<{ results: Movie[]; }>) => import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.');
  }

}
