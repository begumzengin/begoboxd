import { Component } from '@angular/core';
import { Movie } from 'src/app/movie';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {

  favoriteMovies: Movie[] = [];

  ngOnInit(): void {
    const favoriteMoviesJson = localStorage.getItem('favoriteMovies');
    if (favoriteMoviesJson) {
      this.favoriteMovies = JSON.parse(favoriteMoviesJson);
      console.log(this.favoriteMovies);
    }
  }

}
