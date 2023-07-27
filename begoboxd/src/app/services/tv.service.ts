import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TvShow } from '../tv-show';


@Injectable({
  providedIn: 'root'
})
export class TvService {

  private readonly apiKey = '7c16770da7981cc9c39b3d15a0a331bb';
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
}

