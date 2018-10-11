import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';

import { AVReportBranchWiseComponent } from './branch-wise/branch-wise.component';
import { AVReportComponent } from './av-report.component';
import { AVReportRoutingModule } from './av-report-routing.module';

@NgModule({
    imports: [
        CommonModule,
        NgxPaginationModule,
        OrderModule,
        AVReportRoutingModule
    ],
    declarations: [
        AVReportBranchWiseComponent,
        AVReportComponent
    ]
})

export class AVReportModule { }