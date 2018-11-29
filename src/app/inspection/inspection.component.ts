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
    stateId: number = 0;
    stateName: string = '';
    districtId: number = 0;
    districtName: string = '';
    branchId: number = 0;
    branchName: string = '';
    isAssemblyNotStartedOnTime: boolean = false;
    isAssemblyNotEndedOnTime: boolean = false;
    isAssemblyStartedOnTime: boolean = false;
    isAssemblyEndedOnTime: boolean = false;
    isAssemblySchoolPrayerConducted: boolean = false;
    isAssemblyThoughtForTheDayRead: boolean = false;
    isAssemblyEKIDZSongRead: boolean = false;
    isAssemblyWarmUpSongRead: boolean = false;

    constructor(private calendar: NgbCalendar, private appService: AppService) {

    };

    ngOnInit() {
        this.date = this.calendar.getToday();
        //this.getStates();
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
        this.stateId = parseInt(stateId);
        this.stateName = this.states.filter((item) => item.stateId === stateId)[0].stateName;

        this.appService.getDistricts(stateId)
            .subscribe(data => {
                this.districts = data;
            }, error => {
                this.districts = [];
            });
    };

    getBranches(districtId: string) {
        this.districtId = parseInt(districtId);
        this.districtName = this.districts.filter((item) => item.districtId === districtId)[0].districtName;

        this.appService.getBranches(districtId)
            .subscribe(data => {
                this.branches = data;
            }, error => {
                this.branches = [];
            });
    };

    getSelectedBranch(branchId: string) {
        this.branchId = parseInt(branchId);
        this.branchName = this.branches.filter((item) => item.branchId === branchId)[0].branchName;
    };

    showAssemblyStartTimeDelay() {
        this.isAssemblyNotStartedOnTime = true;
    };

    hideAssemblyStartTimeDelay() {
        this.isAssemblyNotStartedOnTime = false;
    };

    showAssemblyEndTimeDelay() {
        this.isAssemblyNotEndedOnTime = true;
    };

    hideAssemblyEndTimeDelay() {
        this.isAssemblyNotEndedOnTime = false;
    };

    saveInspectionData() {
        let inspectionData: any = {
            'date': this.date.year + '-' + this.date.month + '-' + this.date.day,
            'stateId': this.stateId,
            'state': this.stateName,
            'districtId': this.districtId,
            'district': this.districtName,
            'branchId': this.branchId,
            'branch': this.branchName,
            'assembly': {
                'schoolPrayer': this.isAssemblySchoolPrayerConducted,
                'ekidzSong': this.isAssemblyEKIDZSongRead,
                'warmUpSong': this.isAssemblyWarmUpSongRead,
                'thoughtForTheDay': this.isAssemblyThoughtForTheDayRead
            }
        };

    };
}
