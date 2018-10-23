import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspectionComponent } from './inspection.component';

const routes: Routes = [
    {
        path: 'inspection',
        component: InspectionComponent
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

export class InspectionRoutingModule { }