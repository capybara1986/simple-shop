import {Component, OnInit, ViewChild} from '@angular/core';
import {Article} from "../model/Article";
import {ArticleService} from "../service/article.service";
import {ShoppingCartService} from "../service/shopping-cart.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article-board',
  templateUrl: './article-board.component.html',
  styleUrls: ['./article-board.component.scss']
})
export class ArticleBoardComponent implements OnInit {

  articles: Array<Article> = [];
  articlesInCart: Array<Article> = [];
  bufferRequest = 0;
  dataSource = new MatTableDataSource<Article>([]);

  constructor(private articleService: ArticleService,
              private shoppingCartService: ShoppingCartService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.articleService.getArticleBoard().subscribe((result: any) => {
      this.articles = result;
    }).add(() => {
      this.bufferRequest = 100;
    })
    this.shoppingCartService.articles.subscribe((articles: Article[]) => {
      this.articlesInCart = articles;
    })
  }

  goDetails(id:number) {
    this.router.navigate(['articles-board', id]);
  }
  // TODO refactor bc duplicated
  addArticle(article: Article) {
    article.quantity = +1;
    let isInCart = this.articlesInCart.find((item) => {
      return item.id === article.id
    })
    if (isInCart === undefined) {
      article.quantity = 1;
      this.shoppingCartService.add(article)
    } else {
      isInCart.quantity = isInCart.quantity + 1;
    }
    localStorage.setItem('simple_shop_shopping_cart', JSON.stringify(this.articlesInCart));
  }

}
