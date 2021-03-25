import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientCallService } from 'src/app/service/http-client-call.service';


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
      console.log(data);
      console.log(data.user);
      this.user_data = data.user;
      this.getContributions(data.user.login);
    })
  }

  getContributions(user_name) {
    this.httpClientCallService.getUserContibutions(user_name).subscribe(data => {
      console.log("data", data);
    })
  }

}
