import {Injectable} from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUser;

    if (currentUser?.access_token) {

      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + currentUser.access_token.token
        }
      })

    }
    return next.handle(req);
  }


}
