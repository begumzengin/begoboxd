import { Component, inject } from '@angular/core';
import { Movie } from 'src/app/movie';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  //private dataService: DataService = inject(DataService);
  //userName = this.dataService.sharedUserName = '';
  userName: string = '';
  nameSubmitted: boolean = false;

  ngOnInit() {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      this.userName = storedUserName;
      this.nameSubmitted = true;
    }
  }

  currentFaveMovies: Movie[] = [
    {
      adult: false,
      backdrop_path: '/qJeU7KM4nT2C1WpOrwPcSDGFUWE.jpg',
      genre_ids: [35, 18, 10749, 10402],
      id: 313369,
      original_language: 'en',
      original_title: 'La La Land',
      overview:
        'Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.',
      popularity: 44.358,
      poster_path: '/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
      release_date: '2016-11-29',
      title: 'La La Land',
      video: false,
      vote_average: 7.893,
      vote_count: 15430,
    },
    {
      adult: false,
      backdrop_path: '/mfJepkInUbiZ0mFXFhDNz8ko6Zr.jpg',
      genre_ids: [18, 9648, 878],
      id: 1124,
      original_language: 'en',
      original_title: 'The Prestige',
      overview:
        'A mysterious story of two magicians whose intense rivalry leads them on a life-long battle for supremacy -- full of obsession, deceit and jealousy with dangerous and deadly consequences.',
      popularity: 54.844,
      poster_path: '/bdN3gXuIZYaJP7ftKK2sU0nPtEA.jpg',
      release_date: '2006-10-19',
      title: 'The Prestige',
      video: false,
      vote_average: 8.201,
      vote_count: 14424,
    },
  ];

  submitName() {
    if (this.userName.trim() !== '') {
      localStorage.setItem('userName', this.userName);
      this.nameSubmitted = true;
    }
    console.log(this.userName);
  }
}
