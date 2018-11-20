import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspectionReportComponent } from './inspection-report.component';

const routes: Routes = [  
    {
        path: 'inspection-report',
        component: InspectionReportComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class InspectionReportRoutingModule { }