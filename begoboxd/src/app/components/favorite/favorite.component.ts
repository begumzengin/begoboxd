import { Component, inject } from '@angular/core';
import { Movie } from 'src/app/movie';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {

  private confirmationService: ConfirmationService = inject(ConfirmationService);
  private messageService: MessageService = inject(MessageService);

  favoriteMovies: Movie[] = [];

  ngOnInit(): void {
    const favoriteMoviesJson = localStorage.getItem('favoriteMovies');
    if (favoriteMoviesJson) {
      this.favoriteMovies = JSON.parse(favoriteMoviesJson);
      console.log(this.favoriteMovies);
    }
  }
}
