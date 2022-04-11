import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {User} from "../model/User";

export class Token{
  token:string = "";
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseURL: URL;
  public currentUserSubject: BehaviorSubject<User | null>

  constructor(private router: Router, private http: HttpClient) {
    this.baseURL = new URL(environment.baseUrl);
    const userData = localStorage.getItem('simple_store_current_user');
    this.currentUserSubject = new BehaviorSubject<any>(null);
    if(userData) {
      this.currentUserSubject.next(JSON.parse(userData));
    }
  }
  public get currentUser() {
    return this.currentUserSubject.value
  }
  me() {
    return this.http.get(this.baseURL.href + '/me');
  }
  getFakerUser():Observable<User> {
    return this.http.get<User>(this.baseURL.href + '/users/1');
  }
  logout() {
    localStorage.removeItem('simple_store_current_user');
    this.currentUserSubject.next(null)
    this.router.navigateByUrl('/articles-board')
  }
  login(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(this.baseURL.href + 'auth/login', {
      username,
      password
    }).pipe(
      map((result: {token:string}) => {
        let token = new Token();
        token.token =result.token
        return token;
      })
    )
  }
}
