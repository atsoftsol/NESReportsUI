import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { AVReportModule } from './av-report/av-report.module';
import { FeedbackReportModule } from './feedback-report/feedback-report.module';
import { InspectionModule } from './inspection/inspection.module';

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
    LoginModule,
    AVReportModule,
    FeedbackReportModule,
    InspectionModule,
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