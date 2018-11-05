import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OrderModule } from 'ngx-order-pipe';
import { FeedbackReportComponent } from './feedback-report.component';
import { FeedbackReportService } from './feedback-report.service';
import { FeedbackReportRoutingModule } from './feedback-report-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NgMultiSelectDropDownModule.forRoot(),
        OrderModule,
        FeedbackReportRoutingModule
    ],
    declarations: [
        FeedbackReportComponent
    ],
    providers: [
        FeedbackReportService
    ]
})

export class FeedbackReportModule { }