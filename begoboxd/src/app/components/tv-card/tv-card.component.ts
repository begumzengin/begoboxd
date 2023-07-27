import { Component, Input, inject } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';
import { TvShow } from 'src/app/tv-show';
import { TVSHOWS } from 'src/app/mock-tv';

@Component({
  selector: 'app-tv-card',
  templateUrl: './tv-card.component.html',
  styleUrls: ['./tv-card.component.css']
})
export class TvCardComponent {

  tvService: TvService=inject(TvService);

  @Input() tvshow: TvShow = {
    backdrop_path: '',
    first_air_date: '',
    genre_ids: [],
    id: 0,
    name: '',
    origin_country: [],
    original_language: '',
    original_name: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    vote_average: 0,
    vote_count: 0,
  }
}
