import { EmployeeService } from './../services/employeeService';
import { ContactService } from './../services/contactService';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../domain/appointment';
import { AppointmentService } from '../services/appointmentService';
import { Appointmentclass } from '../domain/appointmentclass';
import { Contact } from '../domain/contact';
import { Employee } from '../domain/employee';
import { Contactclass } from '../domain/contactclass';
import { Employeeclass } from '../domain/employeeclass';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
  providers:[AppointmentService, ContactService, EmployeeService]
})
export class AppointmentsComponent implements OnInit {

  clonedSelectedAppointment: Appointment;
  indexSelected: number;
  
  selectedGuest: Contact;
  selectedHost: Employee;
  guestList: Contact[];
  hostList : Employee[];
  appointmentList: Appointment[];
  selectedAppointment: Appointment;
  cloneAppointment: Appointment;
  isNewAppointment: boolean;
  displayDialog: boolean;
  loading: boolean;
  appointment: Appointment = new Appointmentclass();

  constructor(private appointmentService: AppointmentService,
              private contactService: ContactService,
              private employeeService: EmployeeService) { }

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.contactService.getContacts().then(contacts => {
        this.guestList = contacts
        this.employeeService.getEmployees().then(employees => {
          this.hostList = employees
          this.appointmentService.getAppointments().then(appointments => {
            this.appointmentList = appointments
            for(let i=0;i < this.appointmentList.length;i++){
              this.appointmentList[i].guestName = this.guestList.find(id=>id.contactId=this.appointmentList[i].guestId).firstName;
              this.appointmentList[i].hostName = this.hostList.find(id=>id.employeeId=this.appointmentList[i].hostId).firstName;
            }
          });
        });
      });
     
      this.loading = false;
    }, 1000);
  }
  addAppointment() {
    this.isNewAppointment = true;
     this.selectedAppointment = new Appointmentclass;
     this.selectedGuest = new Contactclass;
     this.selectedHost = new Employeeclass;
    this.displayDialog = true;
  }

  saveAppointment() {
    let tmpAppointmentList = [...this.appointmentList];
    this.selectedAppointment.guestId = this.selectedGuest.contactId;
    this.selectedAppointment.hostId = this.selectedHost.employeeId;
    
    if(this.isNewAppointment){
        this.appointmentService.addAppointments(this.selectedAppointment);
        tmpAppointmentList.push(this.selectedAppointment);
    }else{
        this.appointmentService.saveAppointments(this.selectedAppointment);
        tmpAppointmentList[this.appointmentList.indexOf(this.selectedAppointment)] = this.selectedAppointment;
    }
 
    this.appointmentList = tmpAppointmentList;
    this.selectedAppointment = null;
    this.displayDialog = false;
 
  }

  deleteAppointment(){
    if(this.selectedAppointment){
      let index = this.findSelectedAppointmentIndex();
      this.appointmentList = this.appointmentList.filter((val,i) => i!=index);
      this.appointmentService.deleteAppointments(this.selectedAppointment.appointmentId);
      this.selectedAppointment = null;
      this.displayDialog = false;
    }
     
  }

  onRowSelect(event) {
          this.isNewAppointment = false;
          this.selectedAppointment;
          this.cloneAppointment = this.cloneRecord(this.selectedAppointment);
          this.displayDialog = true;
  } 

  cloneRecord(r: Appointment): Appointment {
      let appointment = new Appointmentclass();
      for(let prop in r) {
          appointment[prop] = r[prop];
      }
      return appointment;
  }

  cancelAppointment(){
    this.isNewAppointment = false;
    let tmpAppointmentList = [...this.appointmentList];
    tmpAppointmentList[this.appointmentList.indexOf(this.selectedAppointment)] = this.cloneAppointment;
    this.appointmentList = tmpAppointmentList;
    this.selectedAppointment = this.cloneAppointment;
    this.selectedAppointment = null;
  }

  findSelectedAppointmentIndex(): number {
      return this.appointmentList.indexOf(this.selectedAppointment);
  }

}
