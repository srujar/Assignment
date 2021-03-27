import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClientCallService } from 'src/app/service/http-client-call.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  array = [1, 2, 3, 4, 5];
  users_repos: any = [];
  user_contributions: any;
  z_array: any = [];
  x_array: any = [];
  public graph = {
    data: [
      {
        x: [],
        y: ['Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun'],
        z: [],
        type: 'heatmap',
        colorscale: [
          [0, '#ebedf0'],
          [10, '#9be9a8'],
          [20, '#40c463'],
          [30, '#30a14e'],
          [100, '#216e39'],
        ],
        showscale: false
      },
    ],
    layout: { width: 320, height: 240, title: 'A Fancy Plot' }
  };

  $user_repos: any;
  $user_contributions: any;

  constructor(
    private httpClientCallService: HttpClientCallService
  ) { }

  ngOnInit(): void {
    this.$user_repos = this.httpClientCallService.user_repos.subscribe(data => {
      this.users_repos = data.slice(0, 6);
    })

    this.$user_contributions = this.httpClientCallService.user_contributions.subscribe(data => {
      this.user_contributions = data.totalContributions;
      if (data.totalContributions) {
        this.plotGraphData(data.weeks)
      }

    })
  }

  plotGraphData(data) {
    let z_array = [];
    let x_array = [];
    for (let i = 0; i < 7; i++) {
      z_array.push([]);
      data.forEach((element, index) => {
        if (!(element.contributionDays[i] == undefined || element.contributionDays[i] == null)) {
          z_array[i].push(element.contributionDays[i].contributionCount)
        } else {
          z_array[i].push('NaN')
        }
        if (i == 0) {
          x_array.push(index);
        }
      });
    }
    let sixth_ele = z_array[6][z_array[6].length - 1];
    z_array[6][z_array[6].length - 1] = z_array[0][z_array[0].length - 1];
    z_array[0][z_array[0].length - 1] = sixth_ele;

    let fifth_ele = z_array[5][z_array[5].length - 1];
    z_array[5][z_array[5].length - 1] = z_array[1][z_array[1].length - 1];
    z_array[1][z_array[1].length - 1] = fifth_ele;

    let fourth_ele = z_array[4][z_array[4].length - 1];
    z_array[4][z_array[4].length - 1] = z_array[2][z_array[2].length - 1];
    z_array[2][z_array[2].length - 1] = fourth_ele;
    // z_array[z_array.length - 1] = z_array[z_array.length - 1].reverse();

    // console.log("z_array.......", z_array);
    // console.log("x_array.......", x_array);
    this.x_array = x_array
    this.z_array = z_array

    this.graph.data[0].x = x_array;
    this.graph.data[0].z = z_array;
  }

  ngOnDestroy() {
    if (this.$user_repos) { this.$user_repos.unsubscribe() }
    if (this.$user_contributions) { this.$user_contributions.unsubscribe() }
  }

}
