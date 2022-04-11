import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../service/shopping-cart.service";
import {Article} from "../model/Article";
import {MatTableDataSource} from "@angular/material/table";
import {AuthenticationService} from "../service/authentication.service";
import {User} from "../model/User";

const sumTotal = (arr: Array<Article>) =>
  arr.reduce((sum, {price, quantity}) => sum + price * quantity, 0)


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {


  constructor(private shoppingCartService: ShoppingCartService, public authenticationService: AuthenticationService) {

  }

  displayedColumns: string[] = ['name', 'quantity', 'price', 'action'];
  dataSource = new MatTableDataSource<Article>([]);
  options: any[] = [{label: 'Guest', value: 1}, {label: 'Login', value: 2}];
  favoriteOption: number = 0;
  totalSum: string = "";
  taxSum: string = ""
  sum = "";
  bufferRequest = 100;
  currentUser: User = new User();

  removeArticle(article: Article) {
    this.shoppingCartService.remove(article);
    localStorage.setItem('simple_shop_shopping_cart', JSON.stringify(this.dataSource.data));
  }

  ngOnInit(): void {
    if (this.authenticationService.currentUser) {
      this.currentUser = this.authenticationService.currentUser;
    }

    this.shoppingCartService.get().subscribe((articles: Article[]) => {


      const taxSum = sumTotal(articles) * 0.19
      const totalSum = taxSum + sumTotal(articles);

      this.totalSum = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(totalSum)
      this.taxSum = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(taxSum)
      this.sum = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(sumTotal(articles))

      this.dataSource = new MatTableDataSource(articles);


    })
  }

}
