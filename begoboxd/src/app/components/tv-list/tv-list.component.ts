import { Component, inject } from '@angular/core';
import { TVSHOWS } from 'src/app/mock-tv';
import { TvService } from 'src/app/services/tv.service';
import { TvShow } from 'src/app/tv-show';

@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.component.html',
  styleUrls: ['./tv-list.component.css']
})
export class TvListComponent {
  pageTitle: string = 'Popular TV Shows';
  tvSeries: TvShow[] = [];
  tvService: TvService=inject(TvService);

  ngOnInit(): void {
    this.tvService.getPopularTvSeries().subscribe(
      (tvShow: any) => {
        this.tvSeries = tvShow.results;
      },
      (error) => {
        console.log('Error fetching tv show:', error);
      }
    );
  }
}
