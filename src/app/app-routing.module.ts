import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
    },
    {
        path: 'av-report',
        loadChildren: 'app/av-report/av-report.module#AVReportModule'
    },
    {
        path: 'feedback-report',
        loadChildren: 'app/feedback-report/feedback-report.module#FeedbackReportModule'
    },
    {
        path: 'inspection',
        loadChildren: 'app/inspection/inspection.module#InspectionModule'
    },
    {
        path: 'inspection-report',
        loadChildren: 'app/inspection-report/inspection-report.module#InspectionReportModule'        
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
