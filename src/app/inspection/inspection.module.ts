import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { InspectionComponent } from './inspection.component';
import { InspectionService } from './inspection.service';
import { InspectionRoutingModule } from './inspection-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NgMultiSelectDropDownModule.forRoot(),
        InspectionRoutingModule
    ],
    declarations: [
        InspectionComponent
    ],
    providers: [
        InspectionService
    ]
})

export class InspectionModule { }