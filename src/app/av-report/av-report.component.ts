import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../app.service';
import { AVReportService } from './av-report.service';

@Component({
    templateUrl: 'av-report.component.html'
})

export class AVReportComponent implements OnInit {
    states: any[] = [];
    stateDropdownSettings: any;
    selectedStates: any[] = [];
    districts: any[] = [];
    districtDropdownSettings: any;
    selectedDistricts: any[] = [];
    branches: any[] = [];
    branchDropdownSettings: any;
    selectedBranches: any[] = [];
    startDate: NgbDateStruct;
    endDate: NgbDateStruct;
    reportData: any;
    grandTotalColspan: number;
    page: number = 1;
    dataCount: number;
    noDataColspan: number;
    order: string;
    reverse: boolean = false;
    showReportData: boolean = false;

    constructor(private calendar: NgbCalendar, private appService: AppService, private avReportService: AVReportService) {
        this.stateDropdownSettings = {
            singleSelection: false,
            idField: 'stateId',
            textField: 'stateName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 1,
            allowSearchFilter: true
        };
        this.districtDropdownSettings = {
            singleSelection: false,
            idField: 'districtId',
            textField: 'districtName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 1,
            allowSearchFilter: true
        };
        this.branchDropdownSettings = {
            singleSelection: false,
            idField: 'branchId',
            textField: 'branchName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 1,
            allowSearchFilter: true
        };
    };

    ngOnInit() {
        this.startDate = this.calendar.getPrev(this.calendar.getToday(), 'd', 30);
        this.endDate = this.calendar.getToday();
        this.getStates();
    };

    getStates() {
        this.appService.getStates()
            .subscribe(data => {
                this.states = data;
                this.getStateWiseUsageSummary();
            });
    };

    selectState(item: any) {
        let stateIds: any[] = [];
        this.selectedDistricts = [];
        this.selectedBranches = [];
        this.districts = [];
        this.branches = [];

        for (let i: number = 0; i < this.selectedStates.length; i++) {
            stateIds.push(this.selectedStates[i].stateId);
        }

        this.appService.getDistricts(stateIds.join(','))
            .subscribe(data => {
                this.districts = data;
            });
    };

    selectAllStates(items: any) {
        let stateIds: any[] = [];
        this.selectedStates = this.states;
        this.selectedDistricts = [];
        this.selectedBranches = [];
        this.districts = [];
        this.branches = [];

        for (let i: number = 0; i < this.selectedStates.length; i++) {
            stateIds.push(this.selectedStates[i].stateId);
        }

        this.appService.getDistricts(stateIds.join(','))
            .subscribe(data => {
                this.districts = data;
            });
    };

    unSelectState(item: any) {
        let stateIds: any[] = [];
        this.selectedDistricts = [];
        this.selectedBranches = [];
        this.districts = [];
        this.branches = [];

        for (let i: number = 0; i < this.selectedStates.length; i++) {
            stateIds.push(this.selectedStates[i].stateId);
        }

        this.appService.getDistricts(stateIds.join(','))
            .subscribe(data => {
                this.districts = data;
            });
    };

    unSelectAllStates(items: any) {
        this.selectedStates = [];
        this.selectedDistricts = [];
        this.selectedBranches = [];
        this.districts = [];
        this.branches = [];
    };

    selectDistrict(item: any) {
        let districtIds: any[] = [];
        this.selectedBranches = [];
        this.branches = [];

        for (let i: number = 0; i < this.selectedDistricts.length; i++) {
            districtIds.push(this.selectedDistricts[i].districtId);
        }

        this.appService.getBranches(districtIds.join(','))
            .subscribe(data => {
                this.branches = data;
            });
    };

    selectAllDistricts(items: any) {
        let districtIds: any[] = [];
        this.selectedDistricts = this.districts;
        this.selectedBranches = [];
        this.branches = [];

        for (let i: number = 0; i < this.selectedDistricts.length; i++) {
            districtIds.push(this.selectedDistricts[i].districtId);
        }

        this.appService.getBranches(districtIds.join(','))
            .subscribe(data => {
                this.branches = data;
            });
    };

    unSelectDistrict(item: any) {
        let districtIds: any[] = [];
        this.selectedBranches = [];
        this.branches = [];

        for (let i: number = 0; i < this.selectedDistricts.length; i++) {
            districtIds.push(this.selectedDistricts[i].districtId);
        }

        this.appService.getBranches(districtIds.join(','))
            .subscribe(data => {
                this.branches = data;
            });
    };

    unSelectAllDistricts(items: any) {
        this.selectedDistricts = [];
        this.selectedBranches = [];
        this.branches = [];
    };

    getReportData() {
        if (this.selectedStates.length > 0 && this.selectedDistricts.length === 0 && this.selectedBranches.length === 0) {
            if (this.selectedStates.length === this.states.length) {
                this.getStateWiseUsageSummary();
            }
            else {
                this.getStateWiseUsageDetails();
            }
        }
        else if (this.selectedStates.length > 0 && this.selectedDistricts.length > 0 && this.selectedBranches.length === 0) {
            if (this.selectedDistricts.length === this.districts.length) {
                this.getDistrictWiseUsageSummary();
            }
            else {
                this.getDistrictWiseUsageDetails();
            }
        }
        else if (this.selectedStates.length > 0 && this.selectedDistricts.length > 0 && this.selectedBranches.length > 0) {
            if (this.selectedBranches.length === this.branches.length) {
                this.getBranchWiseUsageSummary();
            }
            else {
                this.getBranchWiseUsageDetails();
            }
        }
    };

    getStateWiseUsageSummary() {
        let stateCodes: any[] = [];
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;

        for (let i: number = 0; i < this.states.length; i++) {
            stateCodes.push(this.states[i].stateCode);
        }

        this.avReportService.getStateWiseUsageSummary(stateCodes.join(','), startDate, endDate)
            .subscribe(data => {
                this.showReportData = true;
                this.reportData = data;
                this.grandTotalColspan = this.reportData.columns.length - this.reportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
                let footerTotalValues: any[] = [];
                let paddingZero = function (n) { return (n < 10 ? '0' : '') + n; }
                let stateWiseData: any = JSON.parse(this.reportData.data);

                for (let i: number = 0; i < stateWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(stateWiseData[i].Duration.split(':')[2]) + (60 * parseInt(stateWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(stateWiseData[i].Duration.split(':')[0]));
                    totalSeconds += durationInSeconds;
                }

                let hours: number = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes: number = Math.floor(totalSeconds / 60);
                let seconds: number = totalSeconds % 60;
                totalDuration = (paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds));
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < stateWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(stateWiseData[i].Duration.split(':')[2]) + (60 * parseInt(stateWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(stateWiseData[i].Duration.split(':')[0]));
                    stateWiseData[i]['Per(%)'] = Math.round((durationInSeconds * 100) / totalDurationInSeconds);
                }

                this.reportData['data'] = stateWiseData;
                footerTotalValues.push(totalDuration);
                footerTotalValues.push('');
                this.dataCount = stateWiseData.length;
                this.noDataColspan = this.reportData.columns.length;
                this.order = this.reportData.sorting;
            });
    };

    getStateWiseUsageDetails() {
        let stateCodes: any[] = [];
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;

        for (let i: number = 0; i < this.selectedStates.length; i++) {
            let state: any = this.states.filter((item) => item.stateId === this.selectedStates[i].stateId);
            stateCodes.push(state[0].stateCode);
        }

        this.avReportService.getStateWiseUsageDetails(stateCodes.join(','), startDate, endDate)
            .subscribe(data => {
                this.showReportData = true;
                this.reportData = data;
                this.grandTotalColspan = this.reportData.columns.length - this.reportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
                let footerTotalValues: any[] = [];
                let paddingZero = function (n) { return (n < 10 ? '0' : '') + n; }
                let stateWiseData: any = JSON.parse(this.reportData.data);

                for (let i: number = 0; i < stateWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(stateWiseData[i].Duration.split(':')[2]) + (60 * parseInt(stateWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(stateWiseData[i].Duration.split(':')[0]));
                    totalSeconds += durationInSeconds;
                }

                let hours: number = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes: number = Math.floor(totalSeconds / 60);
                let seconds: number = totalSeconds % 60;
                totalDuration = (paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds));
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < stateWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(stateWiseData[i].Duration.split(':')[2]) + (60 * parseInt(stateWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(stateWiseData[i].Duration.split(':')[0]));
                    stateWiseData[i]['Per(%)'] = Math.round((durationInSeconds * 100) / totalDurationInSeconds);
                }

                this.reportData['data'] = stateWiseData;
                footerTotalValues.push(totalDuration);
                footerTotalValues.push('');
                this.dataCount = stateWiseData.length;
                this.noDataColspan = this.reportData.columns.length;
                this.order = this.reportData.sorting;
            });
    };

    getDistrictWiseUsageSummary() {
        let stateCodes: any[] = [];
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;

        for (let i: number = 0; i < this.selectedStates.length; i++) {
            let state: any = this.states.filter((item) => item.stateId === this.selectedStates[i].stateId);
            stateCodes.push(state[0].stateCode);
        }

        this.avReportService.getDistrictWiseUsageSummary(stateCodes.join(','), startDate, endDate)
            .subscribe(data => {
                this.showReportData = true;
                this.reportData = data;
                this.grandTotalColspan = this.reportData.columns.length - this.reportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
                let footerTotalValues: any[] = [];
                let paddingZero = function (n) { return (n < 10 ? '0' : '') + n; }
                let districtWiseData: any = JSON.parse(this.reportData.data);

                for (let i: number = 0; i < districtWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(districtWiseData[i].Duration.split(':')[2]) + (60 * parseInt(districtWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(districtWiseData[i].Duration.split(':')[0]));
                    totalSeconds += durationInSeconds;
                }

                let hours: number = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes: number = Math.floor(totalSeconds / 60);
                let seconds: number = totalSeconds % 60;
                totalDuration = (paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds));
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < districtWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(districtWiseData[i].Duration.split(':')[2]) + (60 * parseInt(districtWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(districtWiseData[i].Duration.split(':')[0]));
                    districtWiseData[i]['Per(%)'] = Math.round((durationInSeconds * 100) / totalDurationInSeconds);
                }

                this.reportData['data'] = districtWiseData;
                footerTotalValues.push(totalDuration);
                footerTotalValues.push('');
                this.dataCount = districtWiseData.length;
                this.noDataColspan = this.reportData.columns.length;
                this.order = this.reportData.sorting;
            });
    };

    getDistrictWiseUsageDetails() {
        let districtCodes: any[] = [];
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;

        for (let i: number = 0; i < this.selectedDistricts.length; i++) {
            let district: any = this.districts.filter((item) => item.districtId === this.selectedDistricts[i].districtId);
            districtCodes.push(district[0].districtCode);
        }

        this.avReportService.getDistrictWiseUsageDetails(districtCodes.join(','), startDate, endDate)
            .subscribe(data => {
                this.showReportData = true;
                this.reportData = data;
                this.grandTotalColspan = this.reportData.columns.length - this.reportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
                let footerTotalValues: any[] = [];
                let paddingZero = function (n) { return (n < 10 ? '0' : '') + n; }
                let districtWiseData: any = JSON.parse(this.reportData.data);

                for (let i: number = 0; i < districtWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(districtWiseData[i].Duration.split(':')[2]) + (60 * parseInt(districtWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(districtWiseData[i].Duration.split(':')[0]));
                    totalSeconds += durationInSeconds;
                }

                let hours: number = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes: number = Math.floor(totalSeconds / 60);
                let seconds: number = totalSeconds % 60;
                totalDuration = (paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds));
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < districtWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(districtWiseData[i].Duration.split(':')[2]) + (60 * parseInt(districtWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(districtWiseData[i].Duration.split(':')[0]));
                    districtWiseData[i]['Per(%)'] = Math.round((durationInSeconds * 100) / totalDurationInSeconds);
                }

                this.reportData['data'] = districtWiseData;
                footerTotalValues.push(totalDuration);
                footerTotalValues.push('');
                this.dataCount = districtWiseData.length;
                this.noDataColspan = this.reportData.columns.length;
                this.order = this.reportData.sorting;
            });
    };

    getBranchWiseUsageSummary() {
        let stateCodes: any[] = [];
        let districtCodes: any[] = [];
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;

        for (let i: number = 0; i < this.selectedStates.length; i++) {
            let state: any = this.states.filter((item) => item.stateId === this.selectedStates[i].stateId);
            stateCodes.push(state[0].stateCode);
        }

        for (let i: number = 0; i < this.selectedDistricts.length; i++) {
            let district: any = this.districts.filter((item) => item.districtId === this.selectedDistricts[i].districtId);
            districtCodes.push(district[0].districtCode);
        }

        this.avReportService.getBranchWiseUsageSummary(stateCodes.join(','), districtCodes.join(','), startDate, endDate)
            .subscribe(data => {
                this.showReportData = true;
                this.reportData = data;
                this.grandTotalColspan = this.reportData.columns.length - this.reportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
                let footerTotalValues: any[] = [];
                let paddingZero = function (n) { return (n < 10 ? '0' : '') + n; }
                let branchWiseData: any = JSON.parse(this.reportData.data);

                for (let i: number = 0; i < branchWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(branchWiseData[i].Duration.split(':')[2]) + (60 * parseInt(branchWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(branchWiseData[i].Duration.split(':')[0]));
                    totalSeconds += durationInSeconds;
                }

                let hours: number = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes: number = Math.floor(totalSeconds / 60);
                let seconds: number = totalSeconds % 60;
                totalDuration = (paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds));
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < branchWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(branchWiseData[i].Duration.split(':')[2]) + (60 * parseInt(branchWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(branchWiseData[i].Duration.split(':')[0]));
                    branchWiseData[i]['Per(%)'] = Math.round((durationInSeconds * 100) / totalDurationInSeconds);
                }

                this.reportData['data'] = branchWiseData;
                footerTotalValues.push(totalDuration);
                footerTotalValues.push('');
                this.dataCount = branchWiseData.length;
                this.noDataColspan = this.reportData.columns.length;
                this.order = this.reportData.sorting;
            });
    };

    getBranchWiseUsageDetails() {

    };

    setOrder(value: string) {
        if (this.order === value) {
            this.reverse = !this.reverse;
        }

        this.order = value;
    };
}