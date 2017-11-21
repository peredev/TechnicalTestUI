import {EventEmitter, Injectable, Output} from '@angular/core';
import {Contact} from '../model/contact.model';
import {Http} from '@angular/http';

@Injectable()
export class ContactService {

  apiUrl: String = 'http://localhost:8080/api/contacts/';

  constructor(private http: Http) {
  }

  getAllContacts(): Promise<Contact[]> {
    return new Promise(((resolve, reject) => {
      this.http.get(this.apiUrl + 'all')
        .toPromise()
        .then(res => {
          resolve(res.json());
        })
        .catch(err => {
          reject(err);
        });
    }));
  }

  saveContact(contact): Promise<Contact[]> {
    return new Promise(((resolve, reject) => {
      this.http.post(this.apiUrl + 'save', contact)
        .toPromise()
        .then(res => {
          resolve(res.json());
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    }));
  }

  deleteContact(contact): Promise<Contact[]> {
    return new Promise(((resolve, reject) => {
      this.http.post(this.apiUrl + 'delete', contact)
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
