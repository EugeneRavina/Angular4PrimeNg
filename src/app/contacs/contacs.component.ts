import { ContactService } from './../services/contactService';

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../domain/contact';
import { Contactclass } from '../domain/contactclass';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/components/common/menuitem';

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

  msgs: Message[] = [];
  contactForm: FormGroup;
  submitted: boolean;
  breadcrumb: MenuItem[];
  
constructor(private contactService: ContactService, private fb: FormBuilder) { 

  this.contactForm = this.fb.group({
    'firstname': new FormControl('', Validators.required),
    'lastname': new FormControl('', Validators.required),
    'mobilephone': new FormControl('', Validators.required),
    'streetaddress': new FormControl('', Validators.required),
    'cityaddress': new FormControl('', Validators.required),
    'zipcode': new FormControl('', Validators.required),
    'country': new FormControl('', Validators.required), 
    'emailaddress': new FormControl('', Validators.required),
  });
}

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.contactService.getContacts().then(contacts => this.contactList = contacts);
      this.loading = false;
    }, 1000);

    this.breadcrumb = [
      {label:'Dashboard', routerLink:['/dashboard']},
      {label:'Contacts', routerLink:['/contacts']},
  ];

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
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Added Contact Details'});
    }else{
        this.contactService.saveContacts(this.selectedContact.contactId, this.selectedContact).then(contacts =>{
        tmpContactList[this.contactList.indexOf(this.selectedContact)] = this.selectedContact;
        });
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'warn', summary:'Modified', detail:'Modified Contact Details'});
       
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
      this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Deleted', detail:'Deleted Contact Details'});
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
