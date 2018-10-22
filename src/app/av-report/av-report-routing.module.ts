import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AVReportComponent } from './av-report.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/av-report',
        pathMatch: 'full'
    },
    {
        path: 'av-report',
        component: AVReportComponent,
        data: { title: 'AV Report' }
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