import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  breadcrumb: MenuItem[];
  constructor() { }

  ngOnInit() {
    this.breadcrumb = [
      {label:'Dashboard', routerLink:['/dashboard']},
     
  ];
  }

}
