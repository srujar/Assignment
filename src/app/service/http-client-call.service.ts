import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { EMPTY, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientCallService {

  user_details = new BehaviorSubject<any>([]);
  user_repos = new BehaviorSubject<any>([]);
  user_projects = new BehaviorSubject<any>([]);
  user_contributions = new BehaviorSubject<any>([]);

  //Sample Varriables
  token = '';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) };

  constructor(
    private httpClient: HttpClient,
  ) { }

  //https://api.github.com/users/srujar
  getUser(user_name): any {
    return this.httpClient.get<any>(`https://api.github.com/users/${user_name}`).pipe(
      tap(value => {
        if (value) {
          this.user_details.next(value);
        }
      }));
  }

  getUsersList(): any {
    return this.httpClient.get<any>(`https://api.github.com/users`);
  }

  getUsersRepos(user_name): any {
    return this.httpClient.get<any>(`https://api.github.com/users/${user_name}/repos`).pipe(
      tap(value => {
        if (value) {
          this.user_repos.next(value);
        }
      }));
  }

  getUsersProjects(user_name): any {
    let custom_httpOptions = { headers: new HttpHeaders({ Accept: ['application/vnd.github.spiderman-preview', "application/vnd.github.inertia-preview+json"] }) };
    return this.httpClient.get<any>(`https://api.github.com/users/${user_name}/projects`, custom_httpOptions).pipe(
      tap(value => {
        if (value) {
          this.user_projects.next(value);
        }
      }));
  }

  getUserContibutions(username, from_date, to_date): any {
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
            this.user_contributions.next(value.data.user.contributionsCollection.contributionCalendar);
            return value.data.user.contributionsCollection.contributionCalendar
          }
        }),
        (catchError(error => {
          return of({ 'is_error': true, error })

        }))
      );
  }

}
