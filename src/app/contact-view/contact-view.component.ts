import {Component, OnInit} from '@angular/core';
import {Contact} from '../model/contact.model';
import {ContactService} from '../service/contact.service';
import {Activity} from '../model/activity.model';
import {ActivityService} from "../service/activity.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit {

  contacts: Contact[];
  selectedContact: Contact;
  selectedContactActivities: Activity[];
  searchTerm: string;

  constructor(private contactService: ContactService,
              private activityService: ActivityService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.contactService.getAllContacts()
      .then(data => this.contacts = data);
    this.clearContact();
  }

  selectContact(contact) {
    this.selectedContact = contact;
    this.activityService.getByContact(contact.id)
      .then(res => this.selectedContactActivities = res);
  }

  clearContact() {
    this.selectedContact = new Contact();
    this.selectedContactActivities = [];
  }

  saveContact() {
    this.contactService.saveContact(this.selectedContact)
      .then(res => this.contacts = res);
  }

  deleteContact() {
    this.contactService.deleteContact(this.selectedContact)
      .then(res => {
        this.contacts = res;
        this.clearContact();
      });
  }

  isDeleteButtonDisabled() {
    return !this.selectedContact || !this.selectedContact.id;
  }

  showConfirmationModal(content) {
    this.modalService.open(content).result
      .then(() => this.deleteContact());
  }

}
