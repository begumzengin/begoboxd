import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  menubarItems?: MenuItem[];
  //menuItems = ['Home', 'About', 'Popular Movies', 'Popular TV Shows', 'Search'];

  ngOnInit() {
    this.menubarItems = [
      { 
        label: "home", 
        routerLink: "/", 
        icon: "pi pi-fw pi-home",
      },
      {
        label: "popular movies", 
        routerLink: "/popular-movies", 
        icon: "pi pi-video",
      },
      {
        label: "popular tv shows", 
        routerLink: "/popular-tv", 
        icon: "pi pi-fw pi-desktop",
      },
      {
        label: "search", 
        routerLink: "/search", 
        icon: "pi pi-fw pi-search",
      }
    ];
  }
}
