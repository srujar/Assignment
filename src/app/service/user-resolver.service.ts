import { HttpClientCallService } from './http-client-call.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<any> {

  constructor(
    private router: Router,
    private httpClientCallService: HttpClientCallService
  ) { }

  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    let { user_name } = route.params;
    return this.httpClientCallService
      .getUser(user_name)
      .pipe(
        catchError(error => {
          console.log("error", error);
          this.router.navigateByUrl('users/not-found');
          return EMPTY;
        })
      )
  }

}
