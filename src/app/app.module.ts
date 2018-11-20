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

import { AppService } from './app.service';
import { NgbDateCustomParserFormatter } from '../app/customFormats/dateFormat';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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