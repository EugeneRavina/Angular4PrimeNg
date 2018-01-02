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
        // {label: 'TreeView', icon: 'fa-users', routerLink:['/treeview']},
        {label: 'Contacts', icon: 'fa-phone', routerLink:['/contacts']},
        {label: 'Appointments', icon: 'fa-address-book', routerLink:['/appointments']},
        {label: 'Venues', icon: 'fa-address-book', routerLink:['/venues']},
        {label: 'Google', icon: 'fa-google' , url:"https://www.google.com"}
    ];

  }

//   delete() {
//       this.employees.splice(this.findSelectedCarIndex(), 1);
//       this.employee = null;
//       this.displayDialog = false;
//   }
   
  
}
