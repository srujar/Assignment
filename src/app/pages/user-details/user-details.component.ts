import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientCallService } from 'src/app/service/http-client-call.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user_data: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClientCallService: HttpClientCallService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.user_data = data.user;
      let from_date = new Date(moment('02-01-2021').format('DD/MM/YYYY')).toISOString();
      let to_date = new Date(moment('01-12-2021').format('DD/MM/YYYY')).toISOString();

      this.getContributions(data.user.login, from_date, to_date);
      this.getProjects(data.user.login);
      this.getUserRepos(data.user.login);
    })
  }

  getContributions(user_name, from_date, to_date) {
    this.httpClientCallService.getUserContibutions(user_name, from_date, to_date).subscribe();
  }

  getUserRepos(user_name) {
    this.httpClientCallService.getUsersRepos(user_name).subscribe();
  }

  getProjects(user_name) {
    this.httpClientCallService.getUsersProjects(user_name).subscribe();
  }


}
