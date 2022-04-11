import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../service/article.service";
import {ShoppingCartService} from "../service/shopping-cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs";
import {Article} from "../model/Article";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  bufferRequest = 0;
  article:Article = new Article();
  articlesInCart: Array<Article> = [];
  constructor(private articleService: ArticleService,
              private shoppingCartService: ShoppingCartService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) {
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
  ngOnInit(): void {
    this.activatedRoute.params.pipe(tap((params) => {
      if (params.hasOwnProperty('id')) {

        this.shoppingCartService.articles.subscribe((articles: Article[]) => {
          this.articlesInCart = articles;
        })
        this.articleService.getArticle(params['id']).pipe(

          map((article: Article) => {
            this.article = article;
            this.bufferRequest = 100;
          })).subscribe()
      } else {
        this.router.navigateByUrl('/articles-board');
      }
    })).subscribe();
  }

}
