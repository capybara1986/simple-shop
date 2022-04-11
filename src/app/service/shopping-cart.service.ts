import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {Article} from "../model/Article";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  articlesArray: Array<Article> = []
  articles = new ReplaySubject<Article[]>()

  constructor() {
  }

  add(article: Article) {
    this.articlesArray.push(article)
    this.articles.next(this.articlesArray);
  }
  remove(article: Article) {
    let itemIndex = this.articlesArray.findIndex((item) => {
      return (article.id === item.id);
    })
    if (itemIndex || itemIndex === 0) {
      this.articlesArray.splice(itemIndex,1);
      this.articles.next(this.articlesArray);
    }
  }
  get(): Observable<Article[]> {
    return this.articles.asObservable()
  }
}
