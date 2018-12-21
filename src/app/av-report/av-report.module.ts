import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExportAsModule } from 'ngx-export-as';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OrderModule } from 'ngx-order-pipe';
import { SharedModule } from '../shared/shared.module';
import { AVReportComponent } from './av-report.component';
import { AVReportService } from './av-report.service';
import { AVReportRoutingModule } from './av-report-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ExportAsModule,
        NgbModule,
        NgMultiSelectDropDownModule.forRoot(),
        NgxChartsModule,
        OrderModule,
        SharedModule,
        AVReportRoutingModule
    ],
    declarations: [
        AVReportComponent
    ],
    providers: [
        AVReportService
    ]
})

export class AVReportModule { }