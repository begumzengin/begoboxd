import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TvService {

  private readonly apiKey = '7c16770da7981cc9c39b3d15a0a331bb';
  private readonly baseUrl = 'https://api.themoviedb.org/3/tv/popular';

  constructor(private http: HttpClient) { }
}
