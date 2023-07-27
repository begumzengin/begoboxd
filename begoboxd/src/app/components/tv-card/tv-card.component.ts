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

  tvImageResponse: any;

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

  ngOnInit(): void {
    this.getImage();
  }

  getImage(){
    this.tvService.getTvPoster(this.tvshow.id).subscribe(
      (data : any) => {this.tvImageResponse = data},
    );
  }

  getTvPosterUrl(): string {
    // Check if the response contains posters and get the first poster path if available
    if (this.tvImageResponse && this.tvImageResponse && this.tvImageResponse.posters.length > 0) {

      const baseUrl = 'https://image.tmdb.org/t/p/original';
      const posterPath = this.tvImageResponse.posters[0].file_path;
      return baseUrl + posterPath;
    } else {
      // Return a default placeholder image URL or handle no poster case
      return "https://www.w3schools.com/images/w3schools_green.jpg";
    }
  }
}
