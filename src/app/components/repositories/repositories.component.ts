import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClientCallService } from 'src/app/service/http-client-call.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit, OnDestroy {
  users_repos: any = []

  $user_repos: any;

  constructor(
    private httpClientCallService: HttpClientCallService
  ) { }

  ngOnInit(): void {
    this.$user_repos = this.httpClientCallService.user_repos.subscribe(data => {
      this.users_repos = data;
    })
  }

  ngOnDestroy() {
    if (this.$user_repos) { this.$user_repos.unsubscribe() }
  }

}
