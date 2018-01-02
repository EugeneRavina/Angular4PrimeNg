import { ContactService } from './../services/contactService';

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../domain/contact';
import { Contactclass } from '../domain/contactclass';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-contacs',
  templateUrl: './contacs.component.html',
  styleUrls: ['./contacs.component.css'],
  providers:[ContactService]
})
export class ContacsComponent implements OnInit {

  clonedSelectedContact: Contact;
  indexSelected: number;

  countryList: SelectItem[];
  contactList: Contact[];
  selectedContact: Contact;
  cloneContact: Contact;
  isNewContact: boolean;
  displayDialog: boolean;
  loading: boolean;
  contact: Contact = new Contactclass();

constructor(private contactService: ContactService) { 
  this.countryList = [
    {label:'Select City', value:null},
    {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
    {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
    {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
    {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
    {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
];
}

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.contactService.getContacts().then(contacts => this.contactList = contacts);
      this.loading = false;
    }, 1000);
  }
  addContact() {
    this.isNewContact = true;
     this.selectedContact = new Contactclass;
    this.displayDialog = true;
  }

  saveContact() {
    let tmpContactList = [...this.contactList];
    if(this.isNewContact){
        this.contactService.addContacts(this.selectedContact);
        tmpContactList.push(this.selectedContact);
    }else{
        this.contactService.saveContacts(this.selectedContact);
        tmpContactList[this.contactList.indexOf(this.selectedContact)] = this.selectedContact;
    }
 
    this.contactList = tmpContactList;
    this.selectedContact = null;
    this.displayDialog = false;
 
  }

  deleteContact(){
    if(this.selectedContact){
      let index = this.findSelectedContactIndex();
      this.contactList = this.contactList.filter((val,i) => i!=index);
      this.contactService.deleteContacts(this.selectedContact.contactId);
      this.selectedContact = null;
      this.displayDialog = false;
    }
     
  }

  onRowSelect(event) {
          this.isNewContact = false;
          this.selectedContact;
          this.cloneContact = this.cloneRecord(this.selectedContact);
          this.displayDialog = true;
  } 

  cloneRecord(r: Contact): Contact {
      let contact = new Contactclass();
      for(let prop in r) {
          contact[prop] = r[prop];
      }
      return contact;
  }

  cancelContact(){
    this.isNewContact = false;
    let tmpContactList = [...this.contactList];
    tmpContactList[this.contactList.indexOf(this.selectedContact)] = this.cloneContact;
    this.contactList = tmpContactList;
    this.selectedContact = this.cloneContact;
    this.selectedContact = null;
  }

  findSelectedContactIndex(): number {
      return this.contactList.indexOf(this.selectedContact);
  }

}
