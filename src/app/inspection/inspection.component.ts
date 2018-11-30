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
    assemblyStartTime: string = '';
    assemblyStartTimeDelayInMinutes: string = '0';
    assemblyEndTime: string = '';
    assemblyEndTimeForeCloserMinutes: string = '0';
    isAssemblyNotStartedOnTime: boolean = false;
    isAssemblyNotEndedOnTime: boolean = false;
    isAssemblyStartedOnTime: string = '';
    isAssemblyEndedOnTime: string = '';
    isAssemblySchoolPrayerConducted: string = '';
    isAssemblyThoughtForTheDayRead: string = '';
    isAssemblyEKIDZSongRead: string = '';
    isAssemblyWarmUpSongRead: string = '';

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
        this.stateId = parseInt(stateId);
        this.stateName = this.states.filter((item) => item.stateId === parseInt(stateId))[0].stateName;

        this.appService.getDistricts(stateId)
            .subscribe(data => {
                this.districts = data;
            }, error => {
                this.districts = [];
            });
    };

    getBranches(districtId: string) {
        this.districtId = parseInt(districtId);
        this.districtName = this.districts.filter((item) => item.districtId === parseInt(districtId))[0].districtName;

        this.appService.getBranches(districtId)
            .subscribe(data => {
                this.branches = data;
            }, error => {
                this.branches = [];
            });
    };

    getSelectedBranch(branchId: string) {
        this.branchId = parseInt(branchId);
        this.branchName = this.branches.filter((item) => item.branchId === parseInt(branchId))[0].branchName;
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
                'startTime': this.assemblyStartTime,
                'endTime': this.assemblyEndTime,
                'isStartedOnTime': this.isAssemblyStartedOnTime === 'assemblyStartTimeYes' ? true : false,
                'isEndedOnTime': this.isAssemblyEndedOnTime === 'assemblyEndTimeYes' ? true : false,
                'delayInMinutes': parseInt(this.assemblyStartTimeDelayInMinutes),
                'foreCloserMinutes': parseInt(this.assemblyEndTimeForeCloserMinutes),
                'schoolPrayer': this.isAssemblySchoolPrayerConducted === 'assemblySchoolPrayerConductedYes' ? true : false,
                'thoughtForTheDay': this.isAssemblyThoughtForTheDayRead === 'assemblyThoughtForTheDayReadYes' ? true : false,
                'ekidzSong': this.isAssemblyEKIDZSongRead === 'assemblyEKIDZSongReadYes' ? true : false,
                'warmUpSong': this.isAssemblyWarmUpSongRead === 'assemblyWarmUpSongReadYes' ? true : false
            }
        };

        console.log(JSON.stringify(inspectionData));
    };
}
