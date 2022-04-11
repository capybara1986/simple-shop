import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ArticleBoardComponent} from "./article-board/article-board.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {LoginComponent} from "./login/login.component";
import {ArticleDetailsComponent} from "./article-details/article-details.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'articles-board', component: ArticleBoardComponent},
  {path: 'articles-board/:id', component: ArticleDetailsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'user-profile', component: UserProfileComponent},



  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
