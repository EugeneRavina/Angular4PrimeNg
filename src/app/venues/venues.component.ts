import { VenueService } from './../services/venueService';
import { Component, OnInit } from '@angular/core';
import { Venue } from '../domain/venue';
import { Venueclass } from '../domain/venueclass';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css'],
  providers:[VenueService]
})
export class VenuesComponent implements OnInit {

  venueList: Venue[];
  selectedVenue: Venue;
  cloneVenue: Venue;
  isNewVenue: boolean;
  displayDialog: boolean;
  loading: boolean;
  venue: Venue = new Venueclass();

  constructor(private venueService: VenueService) { }

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.venueService.getVenues().then(venues => this.venueList = venues);
      this.loading = false;
    }, 1000);
  }
  addVenue() {
    this.isNewVenue = true;
     this.selectedVenue = new Venueclass;
    this.displayDialog = true;
  }

  saveVenue() {
    let tmpVenueList = [...this.venueList];
    if(this.isNewVenue){
        this.venueService.addVenues(this.selectedVenue);
        tmpVenueList.push(this.selectedVenue);
    }else{
        this.venueService.saveVenues(this.selectedVenue);
        tmpVenueList[this.venueList.indexOf(this.selectedVenue)] = this.selectedVenue;
    }
 
    this.venueList = tmpVenueList;
    this.selectedVenue = null;
    this.displayDialog = false;
 
  }

  deleteVenue(){
    if(this.selectedVenue){
      let index = this.findSelectedVenueIndex();
      this.venueList = this.venueList.filter((val,i) => i!=index);
      this.venueService.deleteVenues(this.selectedVenue.venueId);
      this.selectedVenue = null;
      this.displayDialog = false;
    }
     
  }

  onRowSelect(event) {
          this.isNewVenue = false;
          this.selectedVenue;
          this.cloneVenue = this.cloneRecord(this.selectedVenue);
          this.displayDialog = true;
  } 

  cloneRecord(r: Venue): Venue {
      let venue = new Venueclass();
      for(let prop in r) {
          venue[prop] = r[prop];
      }
      return venue;
  }

  cancelVenue(){
    this.isNewVenue = false;
    let tmpVenueList = [...this.venueList];
    tmpVenueList[this.venueList.indexOf(this.selectedVenue)] = this.cloneVenue;
    this.venueList = tmpVenueList;
    this.selectedVenue = this.cloneVenue;
    this.selectedVenue = null;
  }

  findSelectedVenueIndex(): number {
      return this.venueList.indexOf(this.selectedVenue);
  }

}
