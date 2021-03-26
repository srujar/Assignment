import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {

  array = [1, 2, 3, 4, 5];
  constructor() { }

  ngOnInit(): void {
  }

}
