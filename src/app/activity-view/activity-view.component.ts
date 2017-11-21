import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../service/activity.service';
import {Subscription} from 'rxjs/Subscription';
import {Activity} from '../model/activity.model';
import {Contact} from "../model/contact.model";
import {ContactService} from "../service/contact.service";
import {ActivityType} from "../model/activity-type.model";
import {NgbDateParserFormatter, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date";

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.css']
})
export class ActivityViewComponent implements OnInit {

  activities: Activity[];
  activityTypes: ActivityType[];
  contacts: Contact[];
  currentActivity: Activity;
  dueDate: NgbDate;

  constructor(private activityService: ActivityService,
              private contactService: ContactService,
              private modalService: NgbModal,
              private dateParser: NgbDateParserFormatter) {
  }

  ngOnInit() {
    this.currentActivity = new Activity();
    this.getUpdatedActivities();
    this.contactService.getAllContacts()
      .then(res => {
        this.contacts = res;
      });
    this.activityService.getActivityTypes()
      .then(res => {
        this.activityTypes = res;
      });
  }

  saveActivity() {
    this.parseDueDate();
    this.activityService.saveActivity(this.currentActivity)
      .then(() => {
        this.getUpdatedActivities();
      });
  }

  deleteActivity() {
    this.activityService.deleteActivity(this.currentActivity)
      .then(() => {
        this.getUpdatedActivities();
      });
  }

  getUpdatedActivities() {
    this.activityService.getAllActivities()
      .then(res => {
        this.activities = res;
      });
  }

  selectActivity(activity: Activity) {
    this.currentActivity = activity;
    this.dueDate = this.formatDate(this.currentActivity.dueDate);
  }

  clearActivity() {
    this.currentActivity = new Activity();
  }

  showConfirmationModal(content) {
    this.modalService.open(content).result.then();
  }

  equals(com1, com2) {
    return com1 && com2 && com1.id === com2.id;
  }

  formatDate(input) {
    const date = new Date(input);
    return new NgbDate(date.getFullYear(), date.getMonth(), date.getDay());
  }

  parseDueDate() {
    this.currentActivity.dueDate = new Date(this.dateParser.format(this.dueDate));
  }
}
