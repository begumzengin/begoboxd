import { Component, inject } from '@angular/core';
import { Movie } from 'src/app/movie';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {

  private confirmationService: ConfirmationService = inject(ConfirmationService);
  private messageService: MessageService = inject(MessageService);
  private dataService: DataService = inject(DataService);

  //userName = this.dataService.sharedUserName;
  userName: string | null = '';

  isMovieInFavorites: boolean = false;
  favoriteMovies: Movie[] = [];

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    
    const favoriteMoviesJson = localStorage.getItem('favoriteMovies');
    if (favoriteMoviesJson) {
      this.favoriteMovies = JSON.parse(favoriteMoviesJson);
      console.log(this.favoriteMovies);
    }
  }
  
}
