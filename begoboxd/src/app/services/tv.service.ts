import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TvShow } from '../tv-show';


@Injectable({
  providedIn: 'root'
})
export class TvService {

  private readonly apiKey = '2bc52123008f1f091b1e60568b13c35b';
  private readonly baseUrl = 'https://api.themoviedb.org/3/tv/popular';

  constructor(private http: HttpClient) { }

  getPopularTvSeries(): Observable<TvShow[]> {
    const url = `${this.baseUrl}/?api_key=${this.apiKey}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    return this.http.get<TvShow[]>(url, { headers });
  }

  getTvPoster(id: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/tv/${id}/images?api_key=${this.apiKey}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    });

    return this.http.get<any>(url, { headers });
  }
}

