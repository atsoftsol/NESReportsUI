import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OrderModule } from 'ngx-order-pipe';
import { SharedModule } from '../shared/shared.module';
import { InspectionReportComponent } from './inspection-report.component';
import { InspectionReportService } from './inspection-report.service';
import { InspectionReportRoutingModule } from './inspection-report-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NgMultiSelectDropDownModule.forRoot(),
        OrderModule,
        SharedModule,
        InspectionReportRoutingModule
    ],
    declarations: [
        InspectionReportComponent
    ],
    providers: [
        InspectionReportService
    ]
})

export class InspectionReportModule { }