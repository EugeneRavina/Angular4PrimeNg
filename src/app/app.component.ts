import { Component, OnInit, Injectable } from '@angular/core';

import { MenuItem } from 'primeng/primeng';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'app';
  results = '';

  items: MenuItem[];

  constructor(private http: HttpClient) { }

  ngOnInit()  {
    
      this.items = [
        {label: 'Dashboard', icon: 'fa-home', routerLink:['/dashboard']},
        {label: 'Employees', icon: 'fa-users', routerLink:['/employees']},
        {label: 'TreeView', icon: 'fa-users', routerLink:['/treeview']},
        {label: 'Google', icon: 'fa-google' , url:"https://www.google.com"}
    ];
    
    this.http.get('http://localhost:55775/api/venues').subscribe(data => {
      console.log(data);
    });
  }

//   delete() {
//       this.employees.splice(this.findSelectedCarIndex(), 1);
//       this.employee = null;
//       this.displayDialog = false;
//   }
   
  
}
