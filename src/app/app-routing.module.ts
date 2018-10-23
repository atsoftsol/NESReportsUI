import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/av-report',
        pathMatch: 'full',
    },
    {
        path: 'av-report',
        loadChildren: 'app/av-report/av-report.module#AVReportModule'
    },
    {
        path: 'inspection',
        loadChildren: 'app/inspection/inspection.module#InspectionModule'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }