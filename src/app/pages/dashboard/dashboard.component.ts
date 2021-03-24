import { Router } from '@angular/router';
import { HttpClientCallService } from './../../service/http-client-call.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users_list: any;
  constructor(
    private httpClientCallService: HttpClientCallService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.httpClientCallService.getUsersList().subscribe(data => {
      console.log(data);
      this.users_list = data;
    })
  }

  selectUser(user_data) {
    console.log("user_data", user_data.login);
    this.router.navigateByUrl(`/user/${user_data.login}`);
  }


}
