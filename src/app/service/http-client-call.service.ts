import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

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

  //https://api.github.com/users/srujar
  getUser(user_name): any {
    return this.httpClient.get<any>(`https://api.github.com/users/${user_name}`);
  }

  getUsersList(): any {
    return this.httpClient.get<any>(`https://api.github.com/users`);
  }

  getUsersRepos(user_name): any {
    return this.httpClient.get<any>(`https://api.github.com/users/${user_name}/repos`);
  }

  getUsersProjects(user_name): any {
    let custom_httpOptions = { headers: new HttpHeaders({ Accept: ['application/vnd.github.spiderman-preview', "application/vnd.github.inertia-preview+json"] }) };
    return this.httpClient.get<any>(`https://api.github.com/users/${user_name}/projects`, custom_httpOptions);
  }

  getUserContibutions(username, from_date, to_date): any {
    console.log(" from_date, to_date..........", from_date, to_date)
    let body = {
      "query": `query {
          user(login: "${username}") {
            name
            email
            createdAt
            contributionsCollection(from: "${from_date}", to: "${to_date}" ) {
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
    return this.httpClient.post<any>('https://api.github.com/graphql', body, this.httpOptions)
      .pipe(
        map(value => {
          if (value) {
            return value.data.user.contributionsCollection.contributionCalendar
          }
        }),
        (catchError(error => {
          return of({ 'is_error': true, error })

        }))
      );
  }

}
