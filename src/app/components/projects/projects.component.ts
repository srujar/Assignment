import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClientCallService } from 'src/app/service/http-client-call.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  users_projects: any = [];
  users_name: any;
  projects_count: any = 0;

  $user_projects: any;
  $user_details: any;

  constructor(
    private httpClientCallService: HttpClientCallService
  ) { }

  ngOnInit(): void {
    this.$user_projects = this.httpClientCallService.user_projects.subscribe(data => {
      this.projects_count = data.length;
      this.users_projects = data;
    })

    this.$user_details = this.httpClientCallService.user_details.subscribe(data => {
      this.users_name = data.name;
    })
  }

  ngOnDestroy() {
    if (this.$user_projects) { this.$user_projects.unsubscribe() }
    if (this.$user_details) { this.$user_details.unsubscribe() }
  }

}
