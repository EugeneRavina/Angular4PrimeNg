
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './../services/employeeService';
import { Employee } from './../domain/employee';
import { Employeeclass } from './../domain/employeeclass';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  employeeList: Employee[];
  selectedEmployee: Employee;
  cloneEmployee: Employee;
  isNewEmployee: boolean;
  displayDialog: boolean;
  loading: boolean;
  employee: Employee = new Employeeclass();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.employeeService.getEmployees().then(employees => this.employeeList = employees);
      this.loading = false;
    }, 1000);
    //this.selectedEmployee = this.employeeList[0]; 
  }

  addEmployee() {
    this.isNewEmployee = true;
    this.employee = new Employeeclass;
    this.displayDialog = true;
  }

  saveEmployee() {
    let tmpEmployeeList = [...this.employeeList];
    if(this.isNewEmployee)
        this.employeeList.push(this.selectedEmployee);
    else
        tmpEmployeeList[this.employeeList.indexOf(this.selectedEmployee)] = this.selectedEmployee;

    this.employeeList = tmpEmployeeList;
    this.selectedEmployee = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
          this.isNewEmployee = false;
          this.selectedEmployee;
          this.cloneEmployee = this.cloneRecord(this.selectedEmployee);
          this.displayDialog = true;
  } 

  cloneRecord(r: Employee): Employee {
      let employee = new Employeeclass();
      for(let prop in r) {
          employee[prop] = r[prop];
      }
      return employee;
  }

  cancelEmployee(){
    this.isNewEmployee = false;
    let tmpEmployeeList = [...this.employeeList];
    tmpEmployeeList[this.employeeList.indexOf(this.selectedEmployee)] = this.cloneEmployee;
    this.employeeList = tmpEmployeeList;
    this.selectedEmployee = this.cloneEmployee;
  }

  findSelectedEmployeeIndex(): number {
      return this.employeeList.indexOf(this.selectedEmployee);
  }
}
