import {Injectable} from '@angular/core';
import {Activity} from '../model/activity.model';
import {Http} from '@angular/http';
import {ActivityType} from '../model/activity-type.model';

@Injectable()
export class ActivityService {

  apiUrl: String = 'http://localhost:8080/api/activities/';

  constructor(private http: Http) {
  }

  getAllActivities(): Promise<Activity[]> {
    return new Promise(((resolve, reject) => {
      this.http.get(this.apiUrl + 'all')
        .toPromise()
        .then(res => {
          resolve(res.json());
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    }));
  }

  getByContact(contactId: number): Promise<Activity[]> {
    return new Promise(((resolve, reject) => {
      this.http.get(this.apiUrl + 'allByContact/' + contactId)
        .toPromise()
        .then(res => {
          resolve(res.json());
        })
        .catch(err => {
          reject(err);
        });
    }));
  }

  saveActivity(activity): Promise<Activity[]> {
    return new Promise(((resolve, reject) => {
      this.http.post(this.apiUrl + 'save', activity)
        .toPromise()
        .then(res => {
          resolve(res.json());
        })
        .catch(err => {
          reject(err);
        });
    }));
  }

  deleteActivity(activity) {
    return new Promise(((resolve, reject) => {
      this.http.post(this.apiUrl + 'delete', activity)
        .toPromise()
        .then(res => {
          resolve(res.json());
        })
        .catch(err => {
          reject(err);
        });
    }));
  }

  getActivityTypes(): Promise<ActivityType[]> {
    return new Promise(((resolve, reject) => {
      this.http.get(this.apiUrl + 'types')
        .toPromise()
        .then(res => {
          resolve(res.json());
        })
        .catch(err => {
          reject(err);
        });
    }));
  }

}
