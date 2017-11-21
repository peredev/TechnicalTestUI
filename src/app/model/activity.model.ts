import {ActivityType} from './activity-type.model';
import {Contact} from "./contact.model";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date";
import {NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";

export class Activity {

  id: number;
  contact: Contact;
  subject: String;
  notes: String;
  dueDate: Date;
  activityType: ActivityType;

  private dateParser: NgbDateParserFormatter;

  setDueDateFromPicker(dateToParse: NgbDate) {
    this.dueDate = new Date(this.dateParser.format(dateToParse));
  }

  getDatepickerDate() {
    return this.dateParser.parse(this.dueDate.toDateString());
  }
}
