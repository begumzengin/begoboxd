import { Injectable } from '@angular/core';
import { Movie } from '../movie';
import { Observable, catchError, of, tap, map } from 'rxjs';
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
      // if not search term, return empty movie array.
      return of([]);
    }
    return this.http.get<Movie[]>(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${term}`).pipe(
      tap(x => x.length ?
         console.log(`found movies matching "${term}"`) :
         console.log(`no movies matching "${term}"`)),
         map((data: any) => data.results),
      catchError(this.handleError<Movie[]>('searchMovies', []))
    );
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
    }

}
