import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { ActivityViewComponent } from './activity-view/activity-view.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ContactService} from './service/contact.service';
import {ActivityService} from './service/activity.service';
import {ActivityFilterPipe} from './activity-view/activity-filter.pipe';
import {ContactFilterPipe} from './contact-view/contact-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContactViewComponent,
    ActivityViewComponent,
    ContactFilterPipe,
    ActivityFilterPipe
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [ContactService, ActivityService],
  bootstrap: [AppComponent]
})
export class AppModule {


}
