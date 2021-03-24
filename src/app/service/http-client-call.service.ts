import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientCallService {

  //Sample Varriables
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    private httpClient: HttpClient,
  ) { }

  getUser(user_name):any{
    return this.httpClient.get<any>(`https://api.github.com/users/${user_name}`);
  }

  getUsersList():any{
    return this.httpClient.get<any>(`https://api.github.com/users`);
  }

}
