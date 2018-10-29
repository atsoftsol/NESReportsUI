import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../app.service';

@Component({
    templateUrl: 'inspection.component.html'
})

export class InspectionComponent implements OnInit {
    date: NgbDateStruct;
    states: any[] = [];
    districts: any[] = [];
    branches: any[] = [];

    constructor(private calendar: NgbCalendar, private appService: AppService) {

    };

    ngOnInit() {
        this.date = this.calendar.getToday();
        this.getStates();
    };

    getStates() {
        this.appService.getStates()
            .subscribe(data => {
                this.states = data;
            }, error => {
                this.states = [];
            });
    };

    getDistricts(stateId: string) {
        this.appService.getDistricts(stateId)
            .subscribe(data => {
                this.districts = data;
            }, error => {
                this.districts = [];
            });
    };

    getBranches(districtId: string) {
        this.appService.getBranches(districtId)
            .subscribe(data => {
                this.branches = data;
            }, error => {
                this.branches = [];
            });
    };
}