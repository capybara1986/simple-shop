import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ResponsiveSidenavModule} from "./responsive-sidenav/responsive-sidenav.module";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {HomeComponent} from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatBadgeModule} from "@angular/material/badge";
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {ArticleBoardComponent} from './article-board/article-board.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTableModule} from "@angular/material/table";
import {LoginComponent} from './login/login.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JwtInterceptor} from "./service/jwt.interceptor";
import {MatRadioModule} from "@angular/material/radio";

import {MatPaginatorModule} from "@angular/material/paginator";
import {ArticleDetailsComponent} from './article-details/article-details.component';

import {BarRatingModule} from "ngx-bar-rating";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShoppingCartComponent,
    ArticleBoardComponent,
    LoginComponent,
    ArticleDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    BarRatingModule,
    MatProgressBarModule,
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    ResponsiveSidenavModule,
    MatMenuModule,
    MatListModule,
    MatBadgeModule,
    MatTableModule,
    MatRadioModule,
    MatPaginatorModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
