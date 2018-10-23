import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AVReportModule } from '../app/av-report/av-report.module';
import { InspectionModule } from '../app/inspection/inspection.module';

import { AppService } from './app.service';

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
    HttpClientModule,
    AVReportModule,
    InspectionModule,
    AppRoutingModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }