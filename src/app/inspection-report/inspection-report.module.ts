import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { InspectionReportComponent } from './inspection-report.component';
import { InspectionReportService } from './inspection-report.service';
import { InspectionReportRoutingModule } from './inspection-report-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgMultiSelectDropDownModule.forRoot(),
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