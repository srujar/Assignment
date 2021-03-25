import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientCallService {

  //Sample Varriables
  token = '26ee0e844dcfb633ff28174961a8517762b4d499';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) };

  constructor(
    private httpClient: HttpClient,
  ) { }

  getUser(user_name): any {
    return this.httpClient.get<any>(`https://api.github.com/users/${user_name}`);
  }

  getUsersList(): any {
    return this.httpClient.get<any>(`https://api.github.com/users`);
  }


  getUserContibutions(username):any {
    let body = {
      "query": `query {
          user(login: "${username}") {
            name
            contributionsCollection {
              contributionCalendar {
                colors
                totalContributions
                weeks {
                  contributionDays {
                    color
                    contributionCount
                    date
                    weekday
                  }
                  firstDay
                }
              }
            }
          }
        }`
    }
    return this.httpClient.post('https://api.github.com/graphql',body,this.httpOptions);

  }

}
