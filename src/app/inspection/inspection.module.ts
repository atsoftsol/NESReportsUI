import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from '../shared/shared.module';
import { InspectionComponent } from './inspection.component';
import { InspectionService } from './inspection.service';
import { InspectionRoutingModule } from './inspection-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        NgbModule,
        NgMultiSelectDropDownModule.forRoot(),
        SharedModule,
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