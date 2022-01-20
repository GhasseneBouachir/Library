import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { BooksComponent } from './books/books.component';
import { AccountsComponent } from './accounts/accounts.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./guards/auth.guard";
import {AccountGuard} from "./guards/account.guard";
import {BorrowsComponent} from "./borrows/borrows.component";

const routes: Routes = [
{path: 'home' , component: HomeComponent },
{path: 'books' , component: BooksComponent, canActivate : [AuthGuard]} ,
{path: 'borrows' , component: BorrowsComponent, canActivate : [AuthGuard]} ,
{path: 'students', component: StudentsComponent , canActivate : [AuthGuard]},
{path: 'accounts', component: AccountsComponent , canActivate : [AuthGuard,AccountGuard]},
{path: 'login', component: LoginComponent},
{path: '**' , component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//export const routingComponents =  [BooksComponent, StudentsComponent, AccountsComponent]
