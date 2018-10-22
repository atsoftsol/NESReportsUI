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
    courses: any[] = [];
    courseDropdownSettings: any;
    selectedCourses: any[] = [];
    subjects: any[] = [];
    subjectDropdownSettings: any;
    selectedSubjects: any[] = [];
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
        this.courseDropdownSettings = {
            singleSelection: false,
            idField: 'courseId',
            textField: 'courseName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 1,
            allowSearchFilter: true
        };
        this.subjectDropdownSettings = {
            singleSelection: false,
            idField: 'subjectId',
            textField: 'subjectName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 1,
            allowSearchFilter: true
        };
    };

    ngOnInit() {
        this.getDates();
        this.getStates();
        this.getCourses();
        this.getSubjects();
    };

    getDates() {
        this.startDate = this.calendar.getPrev(this.calendar.getToday(), 'd', 30);
        this.endDate = this.calendar.getToday();
    };

    getStates() {
        this.appService.getStates()
            .subscribe(data => {
                this.states = data;
                this.getStateWiseUsageSummary();
            });
    };

    getCourses() {
        this.appService.getCourses()
            .subscribe(data => {
                this.courses = data;
            });
    };

    getSubjects() {
        this.appService.getSubjects()
            .subscribe(data => {
                this.subjects = data;
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

    selectBranch(item: any) {
        this.selectedCourses = [];
        this.selectedSubjects = [];
    };

    selectAllBranches(items: any) {
        this.selectedBranches = this.branches;
        this.selectedCourses = [];
        this.selectedSubjects = [];
    };

    unSelectBranch(item: any) {
        this.selectedCourses = [];
        this.selectedSubjects = [];
    };

    unSelectAllBranches(items: any) {
        this.selectedBranches = [];
        this.selectedCourses = [];
        this.selectedSubjects = [];
    };

    selectCourse(item: any) {
        this.selectedSubjects = [];
    };

    selectAllCourses(items: any) {
        this.selectedCourses = this.courses;
        this.selectedSubjects = [];
    };

    unSelectCourse(item: any) {
        this.selectedSubjects = [];
    };

    unSelectAllCourses(items: any) {
        this.selectedCourses = [];
        this.selectedSubjects = [];
    };

    selectAllSubjects($items: any) {
        this.selectedSubjects = this.subjects;
    };

    unSelectAllSubjects($items: any) {
        this.selectedSubjects = [];
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
                if (this.selectedCourses.length === 0) {
                    this.getBranchWiseUsageSummary();
                }
                else {
                    if (this.selectedCourses.length === this.courses.length) {
                        if (this.selectedSubjects.length === 0) {
                            this.getCourseWiseUsageSummary();
                        }
                        else {
                            if (this.selectedSubjects.length === this.subjects.length) {
                                this.getSubjectWiseUsageSummary();
                            }
                            else {
                                this.getSubjectWiseUsageDetails();
                            }
                        }
                    }
                    else {
                        if (this.selectedSubjects.length == 0) {
                            this.getCourseWiseUsageDetails();
                        }
                        else {
                            if (this.selectedSubjects.length === this.subjects.length) {
                                this.getSubjectWiseUsageSummary();
                            }
                            else {
                                this.getSubjectWiseUsageDetails();
                            }
                        }
                    }
                }
            }
            else {
                if (this.selectedCourses.length === 0) {
                    this.getBranchWiseUsageDetails();
                }
                else {
                    if (this.selectedCourses.length === this.courses.length) {
                        if (this.selectedSubjects.length === 0) {
                            this.getCourseWiseUsageSummary();
                        }
                        else {
                            if (this.selectedSubjects.length === this.subjects.length) {
                                this.getSubjectWiseUsageSummary();
                            }
                            else {
                                this.getSubjectWiseUsageDetails();
                            }
                        }
                    }
                    else {
                        if (this.selectedSubjects.length == 0) {
                            this.getCourseWiseUsageDetails();
                        }
                        else {
                            if (this.selectedSubjects.length === this.subjects.length) {
                                this.getSubjectWiseUsageSummary();
                            }
                            else {
                                this.getSubjectWiseUsageDetails();
                            }
                        }
                    }
                }
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
                let totalStrength: number = stateWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength);
                let footerTotalValues: any[] = [];
                footerTotalValues.push(totalStrength);
                footerTotalValues.push(totalDuration);
                footerTotalValues.push('');
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < stateWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(stateWiseData[i].Duration.split(':')[2]) + (60 * parseInt(stateWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(stateWiseData[i].Duration.split(':')[0]));
                    stateWiseData[i]['Per(%)'] = Math.round((durationInSeconds * 100) / totalDurationInSeconds);
                }

                this.reportData['data'] = stateWiseData;
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
                let totalStrength: number = stateWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength);
                let footerTotalValues: any[] = [];
                footerTotalValues.push(totalStrength);
                footerTotalValues.push(totalDuration);
                footerTotalValues.push('');
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < stateWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(stateWiseData[i].Duration.split(':')[2]) + (60 * parseInt(stateWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(stateWiseData[i].Duration.split(':')[0]));
                    stateWiseData[i]['Per(%)'] = Math.round((durationInSeconds * 100) / totalDurationInSeconds);
                }

                this.reportData['data'] = stateWiseData;
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
                let totalStrength: number = districtWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength);
                let footerTotalValues: any[] = [];
                footerTotalValues.push(totalStrength);
                footerTotalValues.push(totalDuration);
                footerTotalValues.push('');
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < districtWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(districtWiseData[i].Duration.split(':')[2]) + (60 * parseInt(districtWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(districtWiseData[i].Duration.split(':')[0]));
                    districtWiseData[i]['Per(%)'] = Math.round((durationInSeconds * 100) / totalDurationInSeconds);
                }

                this.reportData['data'] = districtWiseData;
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
                let totalStrength: number = districtWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength);
                let footerTotalValues: any[] = [];
                footerTotalValues.push(totalStrength);
                footerTotalValues.push(totalDuration);
                footerTotalValues.push('');
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < districtWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(districtWiseData[i].Duration.split(':')[2]) + (60 * parseInt(districtWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(districtWiseData[i].Duration.split(':')[0]));
                    districtWiseData[i]['Per(%)'] = Math.round((durationInSeconds * 100) / totalDurationInSeconds);
                }

                this.reportData['data'] = districtWiseData;
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
                let totalStrength: number = branchWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength);
                let footerTotalValues: any[] = [];
                footerTotalValues.push(totalStrength);
                footerTotalValues.push(totalDuration);
                footerTotalValues.push('');
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < branchWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(branchWiseData[i].Duration.split(':')[2]) + (60 * parseInt(branchWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(branchWiseData[i].Duration.split(':')[0]));
                    branchWiseData[i]['Per(%)'] = Math.round((durationInSeconds * 100) / totalDurationInSeconds);
                }

                this.reportData['data'] = branchWiseData;
                this.dataCount = branchWiseData.length;
                this.noDataColspan = this.reportData.columns.length;
                this.order = this.reportData.sorting;
            });
    };

    getBranchWiseUsageDetails() {
        let stateCodes: any[] = [];
        let districtCodes: any[] = [];
        let branchCodes: any[] = [];
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

        for (let i: number = 0; i < this.selectedBranches.length; i++) {
            let branch: any = this.branches.filter((item) => item.branchId === this.selectedBranches[i].branchId);
            branchCodes.push(branch[0].eurekaBranchCode);
        }

        this.avReportService.getBranchWiseUsageDetails(stateCodes.join(','), districtCodes.join(','), branchCodes.join(','), startDate, endDate)
            .subscribe(data => {
                this.showReportData = true;
                this.reportData = data;
                this.grandTotalColspan = this.reportData.columns.length - this.reportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
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
                let totalStrength: number = branchWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength);
                let footerTotalValues: any[] = [];
                footerTotalValues.push(totalStrength);
                footerTotalValues.push(totalDuration);
                footerTotalValues.push('');
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < branchWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(branchWiseData[i].Duration.split(':')[2]) + (60 * parseInt(branchWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(branchWiseData[i].Duration.split(':')[0]));
                    branchWiseData[i]['Per(%)'] = Math.round((durationInSeconds * 100) / totalDurationInSeconds);
                }

                this.reportData['data'] = branchWiseData;
                this.dataCount = branchWiseData.length;
                this.noDataColspan = this.reportData.columns.length;
                this.order = this.reportData.sorting;
            });
    };

    getCourseWiseUsageSummary() {
        let stateCodes: any[] = [];
        let districtCodes: any[] = [];
        let branchCodes: any[] = [];
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

        for (let i: number = 0; i < this.selectedBranches.length; i++) {
            let branch: any = this.branches.filter((item) => item.branchId === this.selectedBranches[i].branchId);
            branchCodes.push(branch[0].eurekaBranchCode);
        }

        this.avReportService.getCourseWiseUsageSummary(stateCodes.join(','), districtCodes.join(','), branchCodes.join(','), startDate, endDate)
            .subscribe(data => {
                this.showReportData = true;
                this.reportData = data;
                this.grandTotalColspan = this.reportData.columns.length - this.reportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
                let paddingZero = function (n) { return (n < 10 ? '0' : '') + n; }
                let courseWiseData: any = JSON.parse(this.reportData.data);

                for (let i: number = 0; i < courseWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(courseWiseData[i].Duration.split(':')[2]) + (60 * parseInt(courseWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(courseWiseData[i].Duration.split(':')[0]));
                    totalSeconds += durationInSeconds;
                }

                let hours: number = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes: number = Math.floor(totalSeconds / 60);
                let seconds: number = totalSeconds % 60;
                totalDuration = (paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds));
                let totalStrength: number = courseWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength);
                let footerTotalValues: any[] = [];
                footerTotalValues.push(totalStrength);
                footerTotalValues.push(totalDuration);
                footerTotalValues.push('');
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < courseWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(courseWiseData[i].Duration.split(':')[2]) + (60 * parseInt(courseWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(courseWiseData[i].Duration.split(':')[0]));
                    courseWiseData[i]['Per(%)'] = Math.round((durationInSeconds * 100) / totalDurationInSeconds);
                }

                this.reportData['data'] = courseWiseData;
                this.dataCount = courseWiseData.length;
                this.noDataColspan = this.reportData.columns.length;
                this.order = this.reportData.sorting;
            });
    };

    getCourseWiseUsageDetails() {
        let stateCodes: any[] = [];
        let districtCodes: any[] = [];
        let branchCodes: any[] = [];
        let courseCodes: any[] = [];
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

        for (let i: number = 0; i < this.selectedBranches.length; i++) {
            let branch: any = this.branches.filter((item) => item.branchId === this.selectedBranches[i].branchId);
            branchCodes.push(branch[0].eurekaBranchCode);
        }

        for (let i: number = 0; i < this.selectedCourses.length; i++) {
            let course: any = this.courses.filter((item) => item.courseId === this.selectedCourses[i].courseId);
            courseCodes.push(course[0].courseShortName);
        }

        this.avReportService.getCourseWiseUsageDetails(stateCodes.join(','), districtCodes.join(','), branchCodes.join(','), courseCodes.join(','), startDate, endDate)
            .subscribe(data => {
                this.showReportData = true;
                this.reportData = data;
                this.grandTotalColspan = this.reportData.columns.length - this.reportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
                let paddingZero = function (n) { return (n < 10 ? '0' : '') + n; }
                let courseWiseData: any = JSON.parse(this.reportData.data);

                for (let i: number = 0; i < courseWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(courseWiseData[i].Duration.split(':')[2]) + (60 * parseInt(courseWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(courseWiseData[i].Duration.split(':')[0]));
                    totalSeconds += durationInSeconds;
                }

                let hours: number = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes: number = Math.floor(totalSeconds / 60);
                let seconds: number = totalSeconds % 60;
                totalDuration = (paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds));
                let totalStrength: number = courseWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength);
                let footerTotalValues: any[] = [];
                footerTotalValues.push(totalStrength);
                footerTotalValues.push(totalDuration);
                footerTotalValues.push('');
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < courseWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(courseWiseData[i].Duration.split(':')[2]) + (60 * parseInt(courseWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(courseWiseData[i].Duration.split(':')[0]));
                    courseWiseData[i]['Per(%)'] = Math.round((durationInSeconds * 100) / totalDurationInSeconds);
                }

                this.reportData['data'] = courseWiseData;
                this.dataCount = courseWiseData.length;
                this.noDataColspan = this.reportData.columns.length;
                this.order = this.reportData.sorting;
            });
    };

    getSubjectWiseUsageSummary() {
        let stateCodes: any[] = [];
        let districtCodes: any[] = [];
        let branchCodes: any[] = [];
        let courseCodes: any[] = [];
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

        for (let i: number = 0; i < this.selectedBranches.length; i++) {
            let branch: any = this.branches.filter((item) => item.branchId === this.selectedBranches[i].branchId);
            branchCodes.push(branch[0].eurekaBranchCode);
        }

        for (let i: number = 0; i < this.selectedCourses.length; i++) {
            let course: any = this.courses.filter((item) => item.courseId === this.selectedCourses[i].courseId);
            courseCodes.push(course[0].courseShortName);
        }

        this.avReportService.getSubjectWiseUsageSummary(stateCodes.join(','), districtCodes.join(','), branchCodes.join(','), courseCodes.join(','), startDate, endDate)
            .subscribe(data => {
                this.showReportData = true;
                this.reportData = data;
                this.grandTotalColspan = this.reportData.columns.length - this.reportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
                let paddingZero = function (n) { return (n < 10 ? '0' : '') + n; }
                let subjectWiseData: any = JSON.parse(this.reportData.data);

                for (let i: number = 0; i < subjectWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(subjectWiseData[i].Duration.split(':')[2]) + (60 * parseInt(subjectWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(subjectWiseData[i].Duration.split(':')[0]));
                    totalSeconds += durationInSeconds;
                }

                let hours: number = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes: number = Math.floor(totalSeconds / 60);
                let seconds: number = totalSeconds % 60;
                totalDuration = (paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds));
                let totalStrength: number = subjectWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength);
                let footerTotalValues: any[] = [];
                footerTotalValues.push(totalStrength);
                footerTotalValues.push(totalDuration);
                footerTotalValues.push('');
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < subjectWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(subjectWiseData[i].Duration.split(':')[2]) + (60 * parseInt(subjectWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(subjectWiseData[i].Duration.split(':')[0]));
                    subjectWiseData[i]['Per(%)'] = Math.round((durationInSeconds * 100) / totalDurationInSeconds);
                }

                this.reportData['data'] = subjectWiseData;
                this.dataCount = subjectWiseData.length;
                this.noDataColspan = this.reportData.columns.length;
                this.order = this.reportData.sorting;
            });
    };

    getSubjectWiseUsageDetails() {
        let stateCodes: any[] = [];
        let districtCodes: any[] = [];
        let branchCodes: any[] = [];
        let courseCodes: any[] = [];
        let subjectCodes: any[] = [];
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

        for (let i: number = 0; i < this.selectedBranches.length; i++) {
            let branch: any = this.branches.filter((item) => item.branchId === this.selectedBranches[i].branchId);
            branchCodes.push(branch[0].eurekaBranchCode);
        }

        for (let i: number = 0; i < this.selectedCourses.length; i++) {
            let course: any = this.courses.filter((item) => item.courseId === this.selectedCourses[i].courseId);
            courseCodes.push(course[0].courseShortName);
        }

        for (let i: number = 0; i < this.selectedSubjects.length; i++) {
            let subject: any = this.subjects.filter((item) => item.subjectId === this.selectedSubjects[i].subjectId);
            subjectCodes.push(subject[0].subjectName);
        }

        this.avReportService.getSubjectWiseUsageDetails(stateCodes.join(','), districtCodes.join(','), branchCodes.join(','), courseCodes.join(','), subjectCodes.join(','), startDate, endDate)
            .subscribe(data => {
                this.showReportData = true;
                this.reportData = data;
                this.grandTotalColspan = this.reportData.columns.length - this.reportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
                let paddingZero = function (n) { return (n < 10 ? '0' : '') + n; }
                let subjectWiseData: any = JSON.parse(this.reportData.data);

                for (let i: number = 0; i < subjectWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(subjectWiseData[i].Duration.split(':')[2]) + (60 * parseInt(subjectWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(subjectWiseData[i].Duration.split(':')[0]));
                    totalSeconds += durationInSeconds;
                }

                let hours: number = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes: number = Math.floor(totalSeconds / 60);
                let seconds: number = totalSeconds % 60;
                totalDuration = (paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds));
                let totalStrength: number = subjectWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength);
                let footerTotalValues: any[] = [];
                footerTotalValues.push(totalStrength);
                footerTotalValues.push(totalDuration);
                footerTotalValues.push('');
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < subjectWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(subjectWiseData[i].Duration.split(':')[2]) + (60 * parseInt(subjectWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(subjectWiseData[i].Duration.split(':')[0]));
                    subjectWiseData[i]['Per(%)'] = Math.round((durationInSeconds * 100) / totalDurationInSeconds);
                }

                this.reportData['data'] = subjectWiseData;
                this.dataCount = subjectWiseData.length;
                this.noDataColspan = this.reportData.columns.length;
                this.order = this.reportData.sorting;
            });
    };

    setOrder(value: string) {
        if (this.order === value) {
            this.reverse = !this.reverse;
        }

        this.order = value;
    };
}