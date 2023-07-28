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
        label: "Home", 
        routerLink: "/", 
        icon: "pi pi-fw pi-home",
      },
      {
        label: "Popular Movies", 
        routerLink: "/popular-movies", 
        icon: "pi pi-video",
      },
      {
        label: "Popular TV Shows", 
        routerLink: "/popular-tv", 
        icon: "pi pi-fw pi-desktop",
      },
      {
        label: "Search", 
        routerLink: "/search", 
        icon: "pi pi-fw pi-search",
      }
    ];
  }
}
