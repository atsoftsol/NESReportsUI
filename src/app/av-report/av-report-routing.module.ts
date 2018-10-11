import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AVReportComponent } from './av-report.component';

const routes: Routes = [
    {
        path: 'av-report',
        component: AVReportComponent
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

export class AVReportRoutingModule { }