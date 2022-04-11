import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ShoppingCartService} from "./service/shopping-cart.service";
import {Article} from "./model/Article";
import {Event, Router} from "@angular/router";
import {AuthenticationService} from "./service/authentication.service";
import {MatSidenav} from "@angular/material/sidenav";


export interface Section {
  name: string;
  path: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'simple-shop';
  articleCount = 0;
  @ViewChild('start', {static: true}) sideNav!: MatSidenav;

  constructor(private shoppingCartService: ShoppingCartService, private router: Router, public authenticationService: AuthenticationService) {
    this.shoppingCartService.articles.subscribe((articles: Article[]) => {
      this.articleCount = articles.length;
    })
    this.router.events.subscribe((r: Event) => {
      if(this.sideNav.opened) {
        this.sideNav.close();
      }
    })

  }

  ngAfterViewInit(): void {

  }
  goHome() {
    this.router.navigateByUrl('/home')
  }
  goLogin() {
    this.router.navigateByUrl('/login')
  }

  goShoppingCart() {
    this.router.navigateByUrl('/shopping-cart')
  }

  logout() {
    this.authenticationService.logout();
  }


  folders: Section[] = [
    {
      name: 'Home',
      path: '/home'
    },
    {
      name: 'Shop',
      path: '/articles-board'
    },
  ];

  ngOnInit() {
    let sessionStorageArticle = localStorage.getItem('simple_shop_shopping_cart');
    if (sessionStorageArticle) {
      const articles = JSON.parse(sessionStorageArticle) as Array<Article>;
      articles.forEach((item) => {
        this.shoppingCartService.add(item);
      })

    }

  }


}
