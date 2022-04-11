import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Article} from "../model/Article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  baseURL: URL;

  constructor(private http: HttpClient) {
    this.baseURL = new URL(environment.baseUrl);
  }

  getArticle(id: number) {
    return this.http.get<Article>(this.baseURL.href + 'products/' + id)
  }

  getArticleBoard() {
    return this.http.get<Article>(this.baseURL.href + 'products')
  }


}
