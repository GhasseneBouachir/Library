import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Account}  from '../models/Account';

const baseUrl = 'http://localhost:8080/administration';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  myAccounts : Account[] = [];
  constructor(private http: HttpClient) { }

  getAccounts() {
    this.myAccounts = [];
    this.http
      .get<any>(`${baseUrl}/admins`)
      .subscribe((data) => {
        data.map(dt => {
          this.myAccounts.push(dt);
        });
      });
    return this.myAccounts;
  }

  get(id): Observable<Account> {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  create(data): Observable<Account> {
    return this.http.post<any>(baseUrl+"/register", data);
  }

  update(data): Observable<Account> {
    return this.http.put<any>(`${baseUrl}`+"/update", data);
  }

  delete(id): Observable<Account> {
    return this.http.delete<any>(`${baseUrl}`+"/delete/"+id);
  }

  findByTitle(title): Observable<Account> {
    return this.http.get<any>(`${baseUrl}?title=${title}`);
  }

  login(value: any) {
    return this.http.post("http://localhost:8080/administration/authenticate",value);
  }

  getLogged(username) {
    return this.http.get("http://localhost:8080/administration/user/"+username);
  }
}
