import { HttpClientCallService } from './../../service/http-client-call.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users_list:any;
  constructor(
    private httpClientCallService:HttpClientCallService
  ) { }

  ngOnInit(): void {
    this.httpClientCallService.getUsersList().subscribe(data=>{
      console.log(data);
      this.users_list = data;
    })
  }


}
