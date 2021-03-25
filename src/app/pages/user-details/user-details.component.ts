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
      // console.log(data);
      // console.log(data.user);
      this.user_data = data.user;
      // console.log(moment('12-12-2021'));
      let from_date = new Date(moment('02-01-2021').format('DD/MM/YYYY')).toISOString();
      let to_date = new Date(moment('01-12-2021').format('DD/MM/YYYY')).toISOString();
      // console.log("from_date", from_date, to_date);
      this.getContributions(data.user.login, from_date, to_date);
      this.getProjects(data.user.login);
    })
  }

  getContributions(user_name, from_date, to_date) {
    this.httpClientCallService.getUserContibutions(user_name, from_date, to_date).subscribe(data => {
      console.log("UserContibutions data", data);
      this.plotGraphData(data.weeks);
    })
  }

  getProjects(user_name) {
    this.httpClientCallService.getUsersProjects(user_name).subscribe(data => {
      // console.log("projects_data", data);
    })
  }

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
          [40, '#216e39'],
        ],
        showscale: false
      },
      // {
      //   z: [[1, 20,0], [20, 1, 60], [30, 60, 1]],
      //   type: 'heatmap'
      // }
    ],
    // layout: {width: 320, height: 240, title: 'A Fancy Plot'}
  };

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

    console.log("z_array.......", z_array);
    console.log("x_array.......", x_array);
    this.x_array = x_array
    this.z_array = z_array

    this.graph.data[0].x = x_array;
    this.graph.data[0].z = z_array;
  }

}
