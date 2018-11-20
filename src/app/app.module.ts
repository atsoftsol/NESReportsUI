import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AVReportModule } from '../app/av-report/av-report.module';
import { FeedbackReportModule } from '../app/feedback-report/feedback-report.module';
import { InspectionModule } from '../app/inspection/inspection.module';
import { InspectionReportModule } from '../app/inspection-report/inspection-report.module'; 
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module'; 
import { AppService } from './app.service';
import { NgbDateCustomParserFormatter } from '../app/customFormats/dateFormat';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    LoginModule,
    AVReportModule,
    FeedbackReportModule,
    InspectionModule,
    InspectionReportModule,
    AppRoutingModule
     
  ],
  providers: [
    AppService,
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }