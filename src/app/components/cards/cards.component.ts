import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input('repo_data') repo_data: any;
  @Input('slector') slector: any;
  @Input('users_name') users_name: any;
  @Input('each_project') each_project: any;
  @Input('index') index: any;
  @Input('projects_count') projects_count: any;
  constructor() { }

  ngOnInit(): void {
  }

}
