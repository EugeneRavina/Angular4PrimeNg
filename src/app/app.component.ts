import { Component, OnInit, Injectable } from '@angular/core';

import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'app';

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    
      this.items = [
        {label: 'Dashboard', icon: 'fa-home', routerLink:['/dashboard']},
        {label: 'Employees', icon: 'fa-users', routerLink:['/employees']},
        {label: 'Google', icon: 'fa-google' , url:"https://www.google.com"}
    ];
  }



//  

//   delete() {
//       this.employees.splice(this.findSelectedCarIndex(), 1);
//       this.employee = null;
//       this.displayDialog = false;
//   }

//   onRowSelect(event) {
//       this.newEmployee = false;
//       this.employee = this.cloneCar(event.data);
//       this.displayDialog = true;
//   }

//  

//   
  
}
