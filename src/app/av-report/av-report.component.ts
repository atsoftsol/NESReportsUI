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
    serial: number = 1;
    reportData: any = [];
    grandTotalColspan: number;
    dataCount: number;
    noDataColspan: number;
    order: string;
    reverse: boolean = false;
    showReportData: boolean = false;
    showChartData: boolean = false;
    showModalPopup: string = 'none';
    detailedReportType: string = '';
    detailedReportData: any = [];
    detailedReportName: string = '';
    detailedReportGrandTotalColspan: number;
    detailedReportDataCount: number;
    detailedReportNoDataColspan: number;
    detailedReportOrder: string;
    detailedReportReverse: boolean = false;
    showDetailedReportData: boolean = false;
    reportType: string = '';
    barChartView: any[] = [800, 400];
    barChartColorScheme = {
        domain: []
    };
    barChartData: any[] = [];
    barChartXAxisLabel: string;
    barChartYAxisLabel: string;
    groupBarChartView: any[] = [800, 400];
    groupBarChartColorScheme = {
        domain: []
    };
    groupBarChartData: any[] = [];
    groupBarChartXAxisLabel: string;
    groupBarChartYAxisLabel: string;
    showBarChart: boolean = false;
    showGroupBarChart: boolean = false;
    showTableOrChart: string;
    maxDate: NgbDateStruct;

    constructor(private calendar: NgbCalendar, private appService: AppService, private avReportService: AVReportService) {
        this.maxDate = this.calendar.getToday();
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
    };

    getDates() {
        this.startDate = this.calendar.getPrev(this.calendar.getToday(), 'd', 30);
        this.endDate = this.calendar.getToday();
    };

    getStates() {
        this.appService.getStates()
            .subscribe(data => {
                this.states = data;
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

    selectState() {
        let stateIds: any[] = [];
        this.selectedDistricts = [];
        this.selectedBranches = [];
        this.selectedCourses = [];
        this.districts = [];
        this.branches = [];

        for (let i: number = 0; i < this.selectedStates.length; i++) {
            stateIds.push(this.selectedStates[i].stateId);
        }

        this.getStateWiseUsageSummary();

        this.appService.getDistricts(stateIds.join(','))
            .subscribe(data => {
                this.districts = data;
            });
    };

    selectAllStates() {
        let stateIds: any[] = [];
        this.selectedStates = this.states;
        this.selectedDistricts = [];
        this.selectedBranches = [];
        this.selectedCourses = [];
        this.districts = [];
        this.branches = [];

        for (let i: number = 0; i < this.selectedStates.length; i++) {
            stateIds.push(this.selectedStates[i].stateId);
        }

        this.getStateWiseUsageSummary();

        this.appService.getDistricts(stateIds.join(','))
            .subscribe(data => {
                this.districts = data;
            });
    };

    unSelectState() {
        let stateIds: any[] = [];
        this.selectedDistricts = [];
        this.selectedBranches = [];
        this.selectedCourses = [];
        this.districts = [];
        this.branches = [];

        for (let i: number = 0; i < this.selectedStates.length; i++) {
            stateIds.push(this.selectedStates[i].stateId);
        }

        if (this.selectedStates.length > 0) {
            this.getStateWiseUsageSummary();
        }
        else {
            this.showReportData = false;
            this.showChartData = false;
        }

        this.appService.getDistricts(stateIds.join(','))
            .subscribe(data => {
                this.districts = data;
            });
    };

    unSelectAllStates() {
        this.selectedStates = [];
        this.selectedDistricts = [];
        this.selectedBranches = [];
        this.selectedCourses = [];
        this.districts = [];
        this.branches = [];
        this.showReportData = false;
        this.showChartData = false;
    };

    selectDistrict() {
        let districtIds: any[] = [];
        this.selectedBranches = [];
        this.selectedCourses = [];
        this.branches = [];

        for (let i: number = 0; i < this.selectedDistricts.length; i++) {
            districtIds.push(this.selectedDistricts[i].districtId);
        }

        this.getDistrictWiseUsageSummary();

        this.appService.getBranches(districtIds.join(','))
            .subscribe(data => {
                this.branches = data;
            });
    };

    selectAllDistricts() {
        let districtIds: any[] = [];
        this.selectedDistricts = this.districts;
        this.selectedBranches = [];
        this.selectedCourses = [];
        this.branches = [];

        for (let i: number = 0; i < this.selectedDistricts.length; i++) {
            districtIds.push(this.selectedDistricts[i].districtId);
        }

        this.getDistrictWiseUsageSummary();

        this.appService.getBranches(districtIds.join(','))
            .subscribe(data => {
                this.branches = data;
            });
    };

    unSelectDistrict() {
        let districtIds: any[] = [];
        this.selectedBranches = [];
        this.selectedCourses = [];
        this.branches = [];

        for (let i: number = 0; i < this.selectedDistricts.length; i++) {
            districtIds.push(this.selectedDistricts[i].districtId);
        }

        if (this.selectedDistricts.length > 0) {
            this.getDistrictWiseUsageSummary();
        }
        else {
            this.getStateWiseUsageSummary();
        }

        this.appService.getBranches(districtIds.join(','))
            .subscribe(data => {
                this.branches = data;
            });
    };

    unSelectAllDistricts() {
        this.selectedDistricts = [];
        this.selectedBranches = [];
        this.selectedCourses = [];
        this.branches = [];
        this.getStateWiseUsageSummary();
    };

    selectBranch() {
        this.selectedCourses = [];
        this.selectedSubjects = [];
        this.getBranchWiseUsageSummary();
    };

    selectAllBranches() {
        this.selectedBranches = this.branches;
        this.selectedCourses = [];
        this.selectedSubjects = [];
        this.getBranchWiseUsageSummary();
    };

    unSelectBranch() {
        this.selectedCourses = [];
        this.selectedSubjects = [];

        if (this.selectedBranches.length > 0) {
            this.getBranchWiseUsageSummary();
        }
        else {
            this.getDistrictWiseUsageSummary();
        }
    };

    unSelectAllBranches() {
        this.selectedBranches = [];
        this.selectedCourses = [];
        this.selectedSubjects = [];
        this.getDistrictWiseUsageSummary();
    };

    selectCourse() {
        this.selectedSubjects = [];
        this.getCourseWiseUsageSummary();
    };

    selectAllCourses() {
        this.selectedCourses = this.courses;
        this.selectedSubjects = [];
        this.getCourseWiseUsageSummary();
    };

    unSelectCourse() {
        this.selectedSubjects = [];

        if (this.selectedCourses.length > 0) {
            this.getCourseWiseUsageSummary();
        }
        else {
            this.getBranchWiseUsageSummary();
        }
    };

    unSelectAllCourses() {
        this.selectedCourses = [];
        this.selectedSubjects = [];
        this.getBranchWiseUsageSummary();
    };

    onStartDateSelect(date: NgbDateStruct) {
        switch (this.reportType) {
            case 'stateWiseUsageSummary':
                this.getStateWiseUsageSummary();
                break;
            case 'districtWiseUsageSummary':
                this.getDistrictWiseUsageSummary();
                break;
            case 'branchWiseUsageSummary':
                this.getBranchWiseUsageSummary();
                break;
            case 'courseWiseUsageSummary':
                this.getCourseWiseUsageSummary();
                break;
        }
    };

    onEndDateSelect(date: NgbDateStruct) {
        switch (this.reportType) {
            case 'stateWiseUsageSummary':
                this.getStateWiseUsageSummary();
                break;
            case 'districtWiseUsageSummary':
                this.getDistrictWiseUsageSummary();
                break;
            case 'branchWiseUsageSummary':
                this.getBranchWiseUsageSummary();
                break;
            case 'courseWiseUsageSummary':
                this.getCourseWiseUsageSummary();
                break;
        }
    };

    getDetailedReport(item: any) {
        this.showModalPopup = 'block';
        this.showDetailedReportData = true;
        let state: any[] = [];
        let district: any[] = [];
        let branch: any[] = [];
        let course: any[] = [];
        let subject: any[] = [];

        switch (this.detailedReportType) {
            case 'stateWiseDetailedReport':
                state = this.states.filter((e) => e.stateName === item.State);
                this.detailedReportName = item.State;
                this.getStateWiseUsageDetails(state[0].stateId);
                break;
            case 'districtWiseDetailedReport':
                state = this.states.filter((e) => e.stateName === item.State);
                district = this.districts.filter((e) => e.districtName === item.District);
                this.detailedReportName = item.District;
                this.getDistrictWiseUsageDetails(state[0].stateId, district[0].districtId);
                break;
            case 'branchWiseDetailedReport':
                debugger;
                state = this.states.filter((e) => e.stateName === item.State);
                district = this.districts.filter((e) => e.districtName === item.District);
                branch = this.branches.filter((e) => e.branchName === item.Branch);
                this.detailedReportName = item.Branch;
                this.getBranchWiseUsageDetails(state[0].stateId, district[0].districtId, branch[0].branchId);
                break;
            case 'courseWiseDetailedReport':
                state = this.states.filter((e) => e.stateName === item.State);
                district = this.districts.filter((e) => e.districtName === item.District);
                branch = this.branches.filter((e) => e.branchName === item.Branch);
                course = this.courses.filter((e) => e.courseName === item.Course);
                this.detailedReportName = item.Course;
                this.getCourseWiseUsageDetails(state[0].stateId, district[0].districtId, branch[0].branchId, course[0].courseId);
                break;
            case 'subjectWiseDetailedReport':
                state = this.states.filter((e) => e.stateName === item.State);
                district = this.districts.filter((e) => e.districtName === item.District);
                branch = this.branches.filter((e) => e.branchName === item.Branch);
                course = this.courses.filter((e) => e.courseName === item.Course);
                subject = this.subjects.filter((e) => e.subjectName === item.Subject);
                this.detailedReportName = item.Subject;
                this.getSubjectWiseUsageDetails(state[0].stateId, district[0].districtId, branch[0].branchId, course[0].courseId, subject[0].subjectId);
                break;
        }
    };

    closeDetailedReport() {
        this.showModalPopup = 'none';
    };

    getStateWiseUsageSummary() {
        let stateIds: any[] = [];
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
        this.reportType = 'stateWiseUsageSummary';
        this.detailedReportType = 'stateWiseDetailedReport';
        this.showTableOrChart = 'showTable';

        if (this.selectedStates.length === 0) {
            for (let i: number = 0; i < this.states.length; i++) {
                stateIds.push(this.states[i].stateId);
            }
        }
        else {
            for (let i: number = 0; i < this.selectedStates.length; i++) {
                let state: any = this.states.filter((item) => item.stateId === this.selectedStates[i].stateId);
                stateIds.push(state[0].stateId);
            }
        }

        this.avReportService.getStateWiseUsageSummary(stateIds.join(','), startDate, endDate)
            .subscribe(data => {
                this.showReportData = true;
                this.showChartData = false;
                this.showBarChart = false;
                this.showGroupBarChart = false;
                this.reportData = data;
                this.grandTotalColspan = this.reportData.columns.length - this.reportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
                let targetTotalDuration: string;
                let targetTotalSeconds: number = 0;
                let differenceTotalDuration: string;
                let differenceTotalSeconds: number = 0;
                let paddingZero = function (n) { return (n < 10 ? '0' : '') + n; }
                let stateWiseData: any = JSON.parse(this.reportData.data);

                for (let i: number = 0; i < stateWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(stateWiseData[i].Duration.split(':')[2]) + (60 * parseInt(stateWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(stateWiseData[i].Duration.split(':')[0]));
                    let targetDurationInSeconds: number = parseInt(stateWiseData[i].Target.split(':')[2]) + (60 * parseInt(stateWiseData[i].Target.split(':')[1])) + (60 * 60 * parseInt(stateWiseData[i].Target.split(':')[0]));
                    let differenceDurationInSeconds: number = parseInt(stateWiseData[i].Diff.split(':')[2]) + (60 * parseInt(stateWiseData[i].Diff.split(':')[1])) + (60 * 60 * parseInt(stateWiseData[i].Diff.split(':')[0]));
                    totalSeconds += durationInSeconds;
                    targetTotalSeconds += targetDurationInSeconds;
                    differenceTotalSeconds += differenceDurationInSeconds;
                }

                let hours: number = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes: number = Math.floor(totalSeconds / 60);
                let seconds: number = totalSeconds % 60;
                totalDuration = paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds);
                let targetHours: number = Math.floor(targetTotalSeconds / 3600);
                targetTotalSeconds %= 3600;
                let targetMinutes: number = Math.floor(targetTotalSeconds / 60);
                let targetSeconds: number = targetTotalSeconds % 60;
                targetTotalDuration = paddingZero(targetHours) + ':' + paddingZero(targetMinutes) + ':' + paddingZero(targetSeconds);
                let differenceHours: number = Math.floor(differenceTotalSeconds / 3600);
                differenceTotalSeconds %= 3600;
                let differenceMinutes: number = Math.floor(differenceTotalSeconds / 60);
                let differenceSeconds: number = differenceTotalSeconds % 60;
                differenceTotalDuration = paddingZero(differenceHours) + ':' + paddingZero(differenceMinutes) + ':' + paddingZero(differenceSeconds);
                let totalStrength: number = stateWiseData.length > 0 ? stateWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength) : 0;
                let footerTotalValues: any[] = [];
                let footerTotalStrengthObject: any = {};
                footerTotalStrengthObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Strength')[0].align;
                footerTotalStrengthObject['value'] = totalStrength;
                footerTotalValues.push(footerTotalStrengthObject);
                let footerTargetTotalDurationObject: any = {};
                footerTargetTotalDurationObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Target')[0].align;
                footerTargetTotalDurationObject['value'] = targetTotalDuration;
                footerTotalValues.push(footerTargetTotalDurationObject);
                let footerTotalDurationObject: any = {};
                footerTotalDurationObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Duration')[0].align;
                footerTotalDurationObject['value'] = totalDuration;
                footerTotalValues.push(footerTotalDurationObject);
                let footerTotalDifferenceObject: any = {};
                footerTotalDifferenceObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Diff')[0].align;
                footerTotalDifferenceObject['value'] = '00:00:00';
                footerTotalValues.push(footerTotalDifferenceObject);
                let footerTotalPercentageObject: any = {};
                footerTotalPercentageObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Per(%)')[0].align;
                footerTotalPercentageObject['value'] = '';
                footerTotalValues.push(footerTotalPercentageObject);
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));
                this.barChartData = [];
                this.barChartColorScheme.domain = [];

                for (let i: number = 0; i < stateWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(stateWiseData[i].Duration.split(':')[2]) + (60 * parseInt(stateWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(stateWiseData[i].Duration.split(':')[0]));
                    stateWiseData[i]['Per(%)'] = totalDurationInSeconds !== 0 ? Math.round((durationInSeconds * 100) / totalDurationInSeconds) : '0';
                    let barChartDataObject: any = {};
                    barChartDataObject['name'] = stateWiseData[i].State;
                    barChartDataObject['value'] = stateWiseData[i]['Per(%)'];
                    this.barChartData.push(barChartDataObject);
                }

                for (let i: number = 0; i < this.barChartData.length; i++) {
                    this.barChartColorScheme.domain.push('#' + Math.random().toString(16).slice(-6));
                }

                this.barChartData.sort(function (a, b) { return b.value - a.value });
                this.barChartXAxisLabel = 'State';
                this.barChartYAxisLabel = 'Percentage';
                this.reportData['data'] = stateWiseData;
                this.dataCount = stateWiseData.length;
                this.noDataColspan = this.reportData.columns.length;
                this.order = this.reportData.sorting;
            });
    };

    getStateWiseUsageDetails(stateId: string) {
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
        this.reportType = 'stateWiseUsageDetails';

        this.avReportService.getStateWiseUsageDetails(stateId, startDate, endDate)
            .subscribe(data => {
                this.detailedReportData = data;
                this.detailedReportGrandTotalColspan = this.detailedReportData.columns.length - this.detailedReportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
                let targetTotalDuration: string;
                let targetTotalSeconds: number = 0;
                let differenceTotalDuration: string;
                let differenceTotalSeconds: number = 0;
                let paddingZero = function (n) { return (n < 10 ? '0' : '') + n; }
                let stateWiseData: any = JSON.parse(this.detailedReportData.data);

                for (let i: number = 0; i < stateWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(stateWiseData[i].Duration.split(':')[2]) + (60 * parseInt(stateWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(stateWiseData[i].Duration.split(':')[0]));
                    let targetDurationInSeconds: number = parseInt(stateWiseData[i].Target.split(':')[2]) + (60 * parseInt(stateWiseData[i].Target.split(':')[1])) + (60 * 60 * parseInt(stateWiseData[i].Target.split(':')[0]));
                    let differenceDurationInSeconds: number = parseInt(stateWiseData[i].Diff.split(':')[2]) + (60 * parseInt(stateWiseData[i].Diff.split(':')[1])) + (60 * 60 * parseInt(stateWiseData[i].Diff.split(':')[0]));
                    totalSeconds += durationInSeconds;
                    targetTotalSeconds += targetDurationInSeconds;
                    differenceTotalSeconds += differenceDurationInSeconds;
                }

                let hours: number = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes: number = Math.floor(totalSeconds / 60);
                let seconds: number = totalSeconds % 60;
                totalDuration = paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds);
                let targetHours: number = Math.floor(targetTotalSeconds / 3600);
                targetTotalSeconds %= 3600;
                let targetMinutes: number = Math.floor(targetTotalSeconds / 60);
                let targetSeconds: number = targetTotalSeconds % 60;
                targetTotalDuration = paddingZero(targetHours) + ':' + paddingZero(targetMinutes) + ':' + paddingZero(targetSeconds);
                let differenceHours: number = Math.floor(differenceTotalSeconds / 3600);
                differenceTotalSeconds %= 3600;
                let differenceMinutes: number = Math.floor(differenceTotalSeconds / 60);
                let differenceSeconds: number = differenceTotalSeconds % 60;
                differenceTotalDuration = paddingZero(differenceHours) + ':' + paddingZero(differenceMinutes) + ':' + paddingZero(differenceSeconds);
                let totalStrength: number = stateWiseData.length > 0 ? stateWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength) : 0;
                let footerTotalValues: any[] = [];
                let footerTotalStrengthObject: any = {};
                footerTotalStrengthObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Strength')[0].align;
                footerTotalStrengthObject['value'] = totalStrength;
                footerTotalValues.push(footerTotalStrengthObject);
                let footerTargetTotalDurationObject: any = {};
                footerTargetTotalDurationObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Target')[0].align;
                footerTargetTotalDurationObject['value'] = targetTotalDuration;
                footerTotalValues.push(footerTargetTotalDurationObject);
                let footerTotalDurationObject: any = {};
                footerTotalDurationObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Duration')[0].align;
                footerTotalDurationObject['value'] = totalDuration;
                footerTotalValues.push(footerTotalDurationObject);
                let footerTotalDifferenceObject: any = {};
                footerTotalDifferenceObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Diff')[0].align;
                footerTotalDifferenceObject['value'] = '00:00:00';
                footerTotalValues.push(footerTotalDifferenceObject);
                let footerTotalPercentageObject: any = {};
                footerTotalPercentageObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Per(%)')[0].align;
                footerTotalPercentageObject['value'] = '';
                footerTotalValues.push(footerTotalPercentageObject);
                this.detailedReportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < stateWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(stateWiseData[i].Duration.split(':')[2]) + (60 * parseInt(stateWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(stateWiseData[i].Duration.split(':')[0]));
                    stateWiseData[i]['Per(%)'] = totalDurationInSeconds !== 0 ? Math.round((durationInSeconds * 100) / totalDurationInSeconds) : '0';
                }

                this.detailedReportData['data'] = stateWiseData;
                this.detailedReportDataCount = stateWiseData.length;
                this.detailedReportNoDataColspan = this.reportData.columns.length;
                this.order = this.detailedReportData.sorting;
            });
    };

    getDistrictWiseUsageSummary() {
        let stateIds: any[] = [];
        let districtIds: any[] = [];
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
        this.reportType = 'districtWiseUsageSummary';
        this.detailedReportType = 'districtWiseDetailedReport';
        this.showTableOrChart = 'showTable';

        for (let i: number = 0; i < this.selectedStates.length; i++) {
            let state: any = this.states.filter((item) => item.stateId === this.selectedStates[i].stateId);
            stateIds.push(state[0].stateId);
        }

        if (this.selectedDistricts.length === 0) {
            for (let i: number = 0; i < this.districts.length; i++) {
                districtIds.push(this.districts[i].districtId);
            }
        }
        else {
            for (let i: number = 0; i < this.selectedDistricts.length; i++) {
                let district: any = this.districts.filter((item) => item.districtId === this.selectedDistricts[i].districtId);
                districtIds.push(district[0].districtId);
            }
        }

        this.avReportService.getDistrictWiseUsageSummary(stateIds.join(','), districtIds.join(','), startDate, endDate)
            .subscribe(data => {
                this.showReportData = true;
                this.showChartData = false;
                this.showBarChart = false;
                this.showGroupBarChart = false;
                this.reportData = data;
                this.grandTotalColspan = this.reportData.columns.length - this.reportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
                let targetTotalDuration: string;
                let targetTotalSeconds: number = 0;
                let differenceTotalDuration: string;
                let differenceTotalSeconds: number = 0;
                let paddingZero = function (n) { return (n < 10 ? '0' : '') + n; }
                let districtWiseData: any = JSON.parse(this.reportData.data);

                for (let i: number = 0; i < districtWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(districtWiseData[i].Duration.split(':')[2]) + (60 * parseInt(districtWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(districtWiseData[i].Duration.split(':')[0]));
                    let targetDurationInSeconds: number = parseInt(districtWiseData[i].Target.split(':')[2]) + (60 * parseInt(districtWiseData[i].Target.split(':')[1])) + (60 * 60 * parseInt(districtWiseData[i].Target.split(':')[0]));
                    let differenceDurationInSeconds: number = parseInt(districtWiseData[i].Diff.split(':')[2]) + (60 * parseInt(districtWiseData[i].Diff.split(':')[1])) + (60 * 60 * parseInt(districtWiseData[i].Diff.split(':')[0]));
                    totalSeconds += durationInSeconds;
                    targetTotalSeconds += targetDurationInSeconds;
                    differenceTotalSeconds += differenceDurationInSeconds;
                }

                let hours: number = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes: number = Math.floor(totalSeconds / 60);
                let seconds: number = totalSeconds % 60;
                totalDuration = paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds);
                let targetHours: number = Math.floor(targetTotalSeconds / 3600);
                targetTotalSeconds %= 3600;
                let targetMinutes: number = Math.floor(targetTotalSeconds / 60);
                let targetSeconds: number = targetTotalSeconds % 60;
                targetTotalDuration = paddingZero(targetHours) + ':' + paddingZero(targetMinutes) + ':' + paddingZero(targetSeconds);
                let differenceHours: number = Math.floor(differenceTotalSeconds / 3600);
                differenceTotalSeconds %= 3600;
                let differenceMinutes: number = Math.floor(differenceTotalSeconds / 60);
                let differenceSeconds: number = differenceTotalSeconds % 60;
                differenceTotalDuration = paddingZero(differenceHours) + ':' + paddingZero(differenceMinutes) + ':' + paddingZero(differenceSeconds);
                let totalStrength: number = districtWiseData.length > 0 ? districtWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength) : 0;
                let footerTotalValues: any[] = [];
                let footerTotalStrengthObject: any = {};
                footerTotalStrengthObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Strength')[0].align;
                footerTotalStrengthObject['value'] = totalStrength;
                footerTotalValues.push(footerTotalStrengthObject);
                let footerTargetTotalDurationObject: any = {};
                footerTargetTotalDurationObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Target')[0].align;
                footerTargetTotalDurationObject['value'] = targetTotalDuration;
                footerTotalValues.push(footerTargetTotalDurationObject);
                let footerTotalDurationObject: any = {};
                footerTotalDurationObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Duration')[0].align;
                footerTotalDurationObject['value'] = totalDuration;
                footerTotalValues.push(footerTotalDurationObject);
                let footerTotalDifferenceObject: any = {};
                footerTotalDifferenceObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Diff')[0].align;
                footerTotalDifferenceObject['value'] = '00:00:00';
                footerTotalValues.push(footerTotalDifferenceObject);
                let footerTotalPercentageObject: any = {};
                footerTotalPercentageObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Per(%)')[0].align;
                footerTotalPercentageObject['value'] = '';
                footerTotalValues.push(footerTotalPercentageObject);
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));
                this.barChartData = [];
                this.barChartColorScheme.domain = [];

                for (let i: number = 0; i < districtWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(districtWiseData[i].Duration.split(':')[2]) + (60 * parseInt(districtWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(districtWiseData[i].Duration.split(':')[0]));
                    districtWiseData[i]['Per(%)'] = totalDurationInSeconds !== 0 ? Math.round((durationInSeconds * 100) / totalDurationInSeconds) : '0';
                    let barChartDataObject: any = {};
                    barChartDataObject['name'] = districtWiseData[i].District;
                    barChartDataObject['value'] = districtWiseData[i]['Per(%)'];
                    this.barChartData.push(barChartDataObject);
                }

                for (let i: number = 0; i < this.barChartData.length; i++) {
                    this.barChartColorScheme.domain.push('#' + Math.random().toString(16).slice(-6));
                }

                this.barChartData.sort(function (a, b) { return b.value - a.value });
                this.barChartXAxisLabel = 'District';
                this.barChartYAxisLabel = 'Percentage';
                this.reportData['data'] = districtWiseData;
                this.dataCount = districtWiseData.length;
                this.noDataColspan = this.reportData.columns.length;
                this.order = this.reportData.sorting;
            });
    };

    getDistrictWiseUsageDetails(stateId: string, districtId: string) {
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
        this.reportType = 'districtWiseUsageDetails';

        this.avReportService.getDistrictWiseUsageDetails(stateId, districtId, startDate, endDate)
            .subscribe(data => {
                this.detailedReportData = data;
                this.detailedReportGrandTotalColspan = this.detailedReportData.columns.length - this.detailedReportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
                let targetTotalDuration: string;
                let targetTotalSeconds: number = 0;
                let differenceTotalDuration: string;
                let differenceTotalSeconds: number = 0;
                let paddingZero = function (n) { return (n < 10 ? '0' : '') + n; }
                let districtWiseData: any = JSON.parse(this.detailedReportData.data);

                for (let i: number = 0; i < districtWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(districtWiseData[i].Duration.split(':')[2]) + (60 * parseInt(districtWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(districtWiseData[i].Duration.split(':')[0]));
                    let targetDurationInSeconds: number = parseInt(districtWiseData[i].Target.split(':')[2]) + (60 * parseInt(districtWiseData[i].Target.split(':')[1])) + (60 * 60 * parseInt(districtWiseData[i].Target.split(':')[0]));
                    let differenceDurationInSeconds: number = parseInt(districtWiseData[i].Diff.split(':')[2]) + (60 * parseInt(districtWiseData[i].Diff.split(':')[1])) + (60 * 60 * parseInt(districtWiseData[i].Diff.split(':')[0]));
                    totalSeconds += durationInSeconds;
                    targetTotalSeconds += targetDurationInSeconds;
                    differenceTotalSeconds += differenceDurationInSeconds;
                }

                let hours: number = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes: number = Math.floor(totalSeconds / 60);
                let seconds: number = totalSeconds % 60;
                totalDuration = paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds);
                let targetHours: number = Math.floor(targetTotalSeconds / 3600);
                targetTotalSeconds %= 3600;
                let targetMinutes: number = Math.floor(targetTotalSeconds / 60);
                let targetSeconds: number = targetTotalSeconds % 60;
                targetTotalDuration = paddingZero(targetHours) + ':' + paddingZero(targetMinutes) + ':' + paddingZero(targetSeconds);
                let differenceHours: number = Math.floor(differenceTotalSeconds / 3600);
                differenceTotalSeconds %= 3600;
                let differenceMinutes: number = Math.floor(differenceTotalSeconds / 60);
                let differenceSeconds: number = differenceTotalSeconds % 60;
                differenceTotalDuration = paddingZero(differenceHours) + ':' + paddingZero(differenceMinutes) + ':' + paddingZero(differenceSeconds);
                let totalStrength: number = districtWiseData.length > 0 ? districtWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength) : 0;
                let footerTotalValues: any[] = [];
                let footerTotalStrengthObject: any = {};
                footerTotalStrengthObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Strength')[0].align;
                footerTotalStrengthObject['value'] = totalStrength;
                footerTotalValues.push(footerTotalStrengthObject);
                let footerTargetTotalDurationObject: any = {};
                footerTargetTotalDurationObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Target')[0].align;
                footerTargetTotalDurationObject['value'] = targetTotalDuration;
                footerTotalValues.push(footerTargetTotalDurationObject);
                let footerTotalDurationObject: any = {};
                footerTotalDurationObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Duration')[0].align;
                footerTotalDurationObject['value'] = totalDuration;
                footerTotalValues.push(footerTotalDurationObject);
                let footerTotalDifferenceObject: any = {};
                footerTotalDifferenceObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Diff')[0].align;
                footerTotalDifferenceObject['value'] = '00:00:00';
                footerTotalValues.push(footerTotalDifferenceObject);
                let footerTotalPercentageObject: any = {};
                footerTotalPercentageObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Per(%)')[0].align;
                footerTotalPercentageObject['value'] = '';
                footerTotalValues.push(footerTotalPercentageObject);
                this.detailedReportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < districtWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(districtWiseData[i].Duration.split(':')[2]) + (60 * parseInt(districtWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(districtWiseData[i].Duration.split(':')[0]));
                    districtWiseData[i]['Per(%)'] = totalDurationInSeconds !== 0 ? Math.round((durationInSeconds * 100) / totalDurationInSeconds) : '0';
                }

                this.detailedReportData['data'] = districtWiseData;
                this.detailedReportDataCount = districtWiseData.length;
                this.detailedReportNoDataColspan = this.detailedReportData.columns.length;
                this.detailedReportOrder = this.detailedReportData.sorting;
            });
    };

    getBranchWiseUsageSummary() {
        let stateIds: any[] = [];
        let districtIds: any[] = [];
        let branchIds: any[] = [];
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
        this.reportType = 'branchWiseUsageSummary';
        this.detailedReportType = 'branchWiseDetailedReport';
        this.showTableOrChart = 'showTable';

        for (let i: number = 0; i < this.selectedStates.length; i++) {
            let state: any = this.states.filter((item) => item.stateId === this.selectedStates[i].stateId);
            stateIds.push(state[0].stateId);
        }

        for (let i: number = 0; i < this.selectedDistricts.length; i++) {
            let district: any = this.districts.filter((item) => item.districtId === this.selectedDistricts[i].districtId);
            districtIds.push(district[0].districtId);
        }

        if (this.selectedBranches.length === 0) {
            for (let i: number = 0; i < this.branches.length; i++) {
                branchIds.push(this.branches[i].branchId);
            }
        }
        else {
            for (let i: number = 0; i < this.selectedBranches.length; i++) {
                let branch: any = this.branches.filter((item) => item.branchId === this.selectedBranches[i].branchId);
                branchIds.push(branch[0].branchId);
            }
        }

        this.avReportService.getBranchWiseUsageSummary(stateIds.join(','), districtIds.join(','), branchIds.join(','), startDate, endDate)
            .subscribe(data => {
                this.showReportData = true;
                this.showChartData = false;
                this.showBarChart = false;
                this.showGroupBarChart = false;
                this.reportData = data;
                this.grandTotalColspan = this.reportData.columns.length - this.reportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
                let targetTotalDuration: string;
                let targetTotalSeconds: number = 0;
                let differenceTotalDuration: string;
                let differenceTotalSeconds: number = 0;
                let paddingZero = function (n) { return (n < 10 ? '0' : '') + n; }
                let branchWiseData: any = JSON.parse(this.reportData.data);

                for (let i: number = 0; i < branchWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(branchWiseData[i].Duration.split(':')[2]) + (60 * parseInt(branchWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(branchWiseData[i].Duration.split(':')[0]));
                    let targetDurationInSeconds: number = parseInt(branchWiseData[i].Target.split(':')[2]) + (60 * parseInt(branchWiseData[i].Target.split(':')[1])) + (60 * 60 * parseInt(branchWiseData[i].Target.split(':')[0]));
                    let differenceDurationInSeconds: number = parseInt(branchWiseData[i].Diff.split(':')[2]) + (60 * parseInt(branchWiseData[i].Diff.split(':')[1])) + (60 * 60 * parseInt(branchWiseData[i].Diff.split(':')[0]));
                    totalSeconds += durationInSeconds;
                    targetTotalSeconds += targetDurationInSeconds;
                    differenceTotalSeconds += differenceDurationInSeconds;
                }

                let hours: number = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes: number = Math.floor(totalSeconds / 60);
                let seconds: number = totalSeconds % 60;
                totalDuration = paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds);
                let targetHours: number = Math.floor(targetTotalSeconds / 3600);
                targetTotalSeconds %= 3600;
                let targetMinutes: number = Math.floor(targetTotalSeconds / 60);
                let targetSeconds: number = targetTotalSeconds % 60;
                targetTotalDuration = paddingZero(targetHours) + ':' + paddingZero(targetMinutes) + ':' + paddingZero(targetSeconds);
                let differenceHours: number = Math.floor(differenceTotalSeconds / 3600);
                differenceTotalSeconds %= 3600;
                let differenceMinutes: number = Math.floor(differenceTotalSeconds / 60);
                let differenceSeconds: number = differenceTotalSeconds % 60;
                differenceTotalDuration = paddingZero(differenceHours) + ':' + paddingZero(differenceMinutes) + ':' + paddingZero(differenceSeconds);
                let totalStrength: number = branchWiseData.length > 0 ? branchWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength) : 0;
                let footerTotalValues: any[] = [];
                let footerTotalStrengthObject: any = {};
                footerTotalStrengthObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Strength')[0].align;
                footerTotalStrengthObject['value'] = totalStrength;
                footerTotalValues.push(footerTotalStrengthObject);
                let footerTargetTotalDurationObject: any = {};
                footerTargetTotalDurationObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Target')[0].align;
                footerTargetTotalDurationObject['value'] = targetTotalDuration;
                footerTotalValues.push(footerTargetTotalDurationObject);
                let footerTotalDurationObject: any = {};
                footerTotalDurationObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Duration')[0].align;
                footerTotalDurationObject['value'] = totalDuration;
                footerTotalValues.push(footerTotalDurationObject);
                let footerTotalDifferenceObject: any = {};
                footerTotalDifferenceObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Diff')[0].align;
                footerTotalDifferenceObject['value'] = '00:00:00';
                footerTotalValues.push(footerTotalDifferenceObject);
                let footerTotalPercentageObject: any = {};
                footerTotalPercentageObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Per(%)')[0].align;
                footerTotalPercentageObject['value'] = '';
                footerTotalValues.push(footerTotalPercentageObject);
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));
                this.barChartData = [];
                this.barChartColorScheme.domain = [];

                for (let i: number = 0; i < branchWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(branchWiseData[i].Duration.split(':')[2]) + (60 * parseInt(branchWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(branchWiseData[i].Duration.split(':')[0]));
                    branchWiseData[i]['Per(%)'] = totalDurationInSeconds !== 0 ? Math.round((durationInSeconds * 100) / totalDurationInSeconds) : '0';
                    let barChartDataObject: any = {};
                    barChartDataObject['name'] = branchWiseData[i].Branch;
                    barChartDataObject['value'] = branchWiseData[i]['Per(%)'];
                    this.barChartData.push(barChartDataObject);
                }

                for (let i: number = 0; i < this.barChartData.length; i++) {
                    this.barChartColorScheme.domain.push('#' + Math.random().toString(16).slice(-6));
                }

                this.barChartData.sort(function (a, b) { return b.value - a.value });
                this.barChartXAxisLabel = 'Branch';
                this.barChartYAxisLabel = 'Percentage';
                this.reportData['data'] = branchWiseData;
                this.dataCount = branchWiseData.length;
                this.noDataColspan = this.reportData.columns.length;
                this.order = this.reportData.sorting;
            });
    };

    getBranchWiseUsageDetails(stateId: string, districtId: string, branchId: string) {
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
        this.reportType = 'branchWiseUsageDetails';

        this.avReportService.getBranchWiseUsageDetails(stateId, districtId, branchId, startDate, endDate)
            .subscribe(data => {
                this.detailedReportData = data;
                this.detailedReportGrandTotalColspan = this.detailedReportData.columns.length - this.detailedReportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
                let targetTotalDuration: string;
                let targetTotalSeconds: number = 0;
                let differenceTotalDuration: string;
                let differenceTotalSeconds: number = 0;
                let paddingZero = function (n) { return (n < 10 ? '0' : '') + n; }
                let branchWiseData: any = JSON.parse(this.detailedReportData.data);

                for (let i: number = 0; i < branchWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(branchWiseData[i].Duration.split(':')[2]) + (60 * parseInt(branchWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(branchWiseData[i].Duration.split(':')[0]));
                    let targetDurationInSeconds: number = parseInt(branchWiseData[i].Target.split(':')[2]) + (60 * parseInt(branchWiseData[i].Target.split(':')[1])) + (60 * 60 * parseInt(branchWiseData[i].Target.split(':')[0]));
                    let differenceDurationInSeconds: number = parseInt(branchWiseData[i].Diff.split(':')[2]) + (60 * parseInt(branchWiseData[i].Diff.split(':')[1])) + (60 * 60 * parseInt(branchWiseData[i].Diff.split(':')[0]));
                    totalSeconds += durationInSeconds;
                    targetTotalSeconds += targetDurationInSeconds;
                    differenceTotalSeconds += differenceDurationInSeconds;
                }

                let hours: number = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes: number = Math.floor(totalSeconds / 60);
                let seconds: number = totalSeconds % 60;
                totalDuration = paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds);
                let targetHours: number = Math.floor(targetTotalSeconds / 3600);
                targetTotalSeconds %= 3600;
                let targetMinutes: number = Math.floor(targetTotalSeconds / 60);
                let targetSeconds: number = targetTotalSeconds % 60;
                targetTotalDuration = paddingZero(targetHours) + ':' + paddingZero(targetMinutes) + ':' + paddingZero(targetSeconds);
                let differenceHours: number = Math.floor(differenceTotalSeconds / 3600);
                differenceTotalSeconds %= 3600;
                let differenceMinutes: number = Math.floor(differenceTotalSeconds / 60);
                let differenceSeconds: number = differenceTotalSeconds % 60;
                differenceTotalDuration = paddingZero(differenceHours) + ':' + paddingZero(differenceMinutes) + ':' + paddingZero(differenceSeconds);
                let totalStrength: number = branchWiseData.length > 0 ? branchWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength) : 0;
                let footerTotalValues: any[] = [];
                let footerTotalStrengthObject: any = {};
                footerTotalStrengthObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Strength')[0].align;
                footerTotalStrengthObject['value'] = totalStrength;
                footerTotalValues.push(footerTotalStrengthObject);
                let footerTargetTotalDurationObject: any = {};
                footerTargetTotalDurationObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Target')[0].align;
                footerTargetTotalDurationObject['value'] = targetTotalDuration;
                footerTotalValues.push(footerTargetTotalDurationObject);
                let footerTotalDurationObject: any = {};
                footerTotalDurationObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Duration')[0].align;
                footerTotalDurationObject['value'] = totalDuration;
                footerTotalValues.push(footerTotalDurationObject);
                let footerTotalDifferenceObject: any = {};
                footerTotalDifferenceObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Diff')[0].align;
                footerTotalDifferenceObject['value'] = '00:00:00';
                footerTotalValues.push(footerTotalDifferenceObject);
                let footerTotalPercentageObject: any = {};
                footerTotalPercentageObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Per(%)')[0].align;
                footerTotalPercentageObject['value'] = '';
                footerTotalValues.push(footerTotalPercentageObject);
                this.detailedReportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < branchWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(branchWiseData[i].Duration.split(':')[2]) + (60 * parseInt(branchWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(branchWiseData[i].Duration.split(':')[0]));
                    branchWiseData[i]['Per(%)'] = totalDurationInSeconds !== 0 ? Math.round((durationInSeconds * 100) / totalDurationInSeconds) : '0';
                }

                this.detailedReportData['data'] = branchWiseData;
                this.detailedReportDataCount = branchWiseData.length;
                this.detailedReportNoDataColspan = this.reportData.columns.length;
                this.detailedReportOrder = this.reportData.sorting;
            });
    };

    getCourseWiseUsageSummary() {
        let stateIds: any[] = [];
        let districtIds: any[] = [];
        let branchIds: any[] = [];
        let courseIds: any[] = [];
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
        this.reportType = 'courseWiseUsageSummary';
        this.detailedReportType = 'courseWiseDetailedReport';
        this.showTableOrChart = 'showTable';

        for (let i: number = 0; i < this.selectedStates.length; i++) {
            let state: any = this.states.filter((item) => item.stateId === this.selectedStates[i].stateId);
            stateIds.push(state[0].stateId);
        }

        for (let i: number = 0; i < this.selectedDistricts.length; i++) {
            let district: any = this.districts.filter((item) => item.districtId === this.selectedDistricts[i].districtId);
            districtIds.push(district[0].districtId);
        }

        for (let i: number = 0; i < this.selectedBranches.length; i++) {
            let branch: any = this.branches.filter((item) => item.branchId === this.selectedBranches[i].branchId);
            branchIds.push(branch[0].branchId);
        }

        if (this.selectedCourses.length === 0) {
            for (let i: number = 0; i < this.courses.length; i++) {
                courseIds.push(this.courses[i].courseId);
            }
        }
        else {
            for (let i: number = 0; i < this.selectedCourses.length; i++) {
                let course: any = this.courses.filter((item) => item.courseId === this.selectedCourses[i].courseId);
                courseIds.push(course[0].courseId);
            }
        }

        this.avReportService.getCourseWiseUsageSummary(stateIds.join(','), districtIds.join(','), branchIds.join(','), courseIds.join(','), startDate, endDate)
            .subscribe(data => {
                this.showReportData = true;
                this.showChartData = false;
                this.showBarChart = false;
                this.showGroupBarChart = false;
                this.reportData = data;
                this.grandTotalColspan = this.reportData.columns.length - this.reportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
                let targetTotalDuration: string;
                let targetTotalSeconds: number = 0;
                let differenceTotalDuration: string;
                let differenceTotalSeconds: number = 0;
                let paddingZero = function (n) { return (n < 10 ? '0' : '') + n; }
                let courseWiseData: any = JSON.parse(this.reportData.data);

                for (let i: number = 0; i < courseWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(courseWiseData[i].Duration.split(':')[2]) + (60 * parseInt(courseWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(courseWiseData[i].Duration.split(':')[0]));
                    let targetDurationInSeconds: number = parseInt(courseWiseData[i].Target.split(':')[2]) + (60 * parseInt(courseWiseData[i].Target.split(':')[1])) + (60 * 60 * parseInt(courseWiseData[i].Target.split(':')[0]));
                    let differenceDurationInSeconds: number = parseInt(courseWiseData[i].Diff.split(':')[2]) + (60 * parseInt(courseWiseData[i].Diff.split(':')[1])) + (60 * 60 * parseInt(courseWiseData[i].Diff.split(':')[0]));
                    totalSeconds += durationInSeconds;
                    targetTotalSeconds += targetDurationInSeconds;
                    differenceTotalSeconds += differenceDurationInSeconds;
                }

                let hours: number = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes: number = Math.floor(totalSeconds / 60);
                let seconds: number = totalSeconds % 60;
                totalDuration = paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds);
                let targetHours: number = Math.floor(targetTotalSeconds / 3600);
                targetTotalSeconds %= 3600;
                let targetMinutes: number = Math.floor(targetTotalSeconds / 60);
                let targetSeconds: number = targetTotalSeconds % 60;
                targetTotalDuration = paddingZero(targetHours) + ':' + paddingZero(targetMinutes) + ':' + paddingZero(targetSeconds);
                let differenceHours: number = Math.floor(differenceTotalSeconds / 3600);
                differenceTotalSeconds %= 3600;
                let differenceMinutes: number = Math.floor(differenceTotalSeconds / 60);
                let differenceSeconds: number = differenceTotalSeconds % 60;
                differenceTotalDuration = paddingZero(differenceHours) + ':' + paddingZero(differenceMinutes) + ':' + paddingZero(differenceSeconds);
                let totalStrength: number = courseWiseData.length > 0 ? courseWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength) : 0;
                let footerTotalValues: any[] = [];
                let footerTotalStrengthObject: any = {};
                footerTotalStrengthObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Strength')[0].align;
                footerTotalStrengthObject['value'] = totalStrength;
                footerTotalValues.push(footerTotalStrengthObject);
                let footerTargetTotalDurationObject: any = {};
                footerTargetTotalDurationObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Target')[0].align;
                footerTargetTotalDurationObject['value'] = targetTotalDuration;
                footerTotalValues.push(footerTargetTotalDurationObject);
                let footerTotalDurationObject: any = {};
                footerTotalDurationObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Duration')[0].align;
                footerTotalDurationObject['value'] = totalDuration;
                footerTotalValues.push(footerTotalDurationObject);
                let footerTotalDifferenceObject: any = {};
                footerTotalDifferenceObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Diff')[0].align;
                footerTotalDifferenceObject['value'] = '00:00:00';
                footerTotalValues.push(footerTotalDifferenceObject);
                let footerTotalPercentageObject: any = {};
                footerTotalPercentageObject['align'] = this.reportData.footerTotalColumns.filter((item) => item.name === 'Per(%)')[0].align;
                footerTotalPercentageObject['value'] = '';
                footerTotalValues.push(footerTotalPercentageObject);
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));
                this.groupBarChartData = [];
                this.groupBarChartColorScheme.domain = [];

                for (let i: number = 0; i < courseWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(courseWiseData[i].Duration.split(':')[2]) + (60 * parseInt(courseWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(courseWiseData[i].Duration.split(':')[0]));
                    courseWiseData[i]['Per(%)'] = totalDurationInSeconds !== 0 ? Math.round((durationInSeconds * 100) / totalDurationInSeconds) : '0';
                }

                let distinctBranchNames: any = [];

                for (let i: number = 0; i < courseWiseData.length; i++) {
                    if (distinctBranchNames.indexOf(courseWiseData[i].Branch) == -1) {
                        distinctBranchNames.push(courseWiseData[i].Branch);
                    }
                }

                distinctBranchNames = distinctBranchNames.sort();

                distinctBranchNames.forEach((item, index) => {
                    let groupBarChartDataObject: any = {};
                    groupBarChartDataObject['name'] = item;
                    let branchData: any = courseWiseData.filter((e) => e.Branch === item);
                    let branchSeries: any[] = [];

                    branchData.forEach((item, index) => {
                        let branchSeriesObject: any = {};
                        branchSeriesObject['name'] = item.Course;
                        branchSeriesObject['value'] = item['Per(%)'];
                        branchSeries.push(branchSeriesObject);
                    });

                    groupBarChartDataObject['series'] = branchSeries;
                    this.groupBarChartData.push(groupBarChartDataObject);
                });

                for (let i: number = 0; i < this.groupBarChartData.length; i++) {
                    this.groupBarChartColorScheme.domain.push('#' + Math.random().toString(16).slice(-6));
                }

                this.groupBarChartXAxisLabel = 'Branch';
                this.groupBarChartYAxisLabel = 'Percentage';
                this.reportData['data'] = courseWiseData;
                this.dataCount = courseWiseData.length;
                this.noDataColspan = this.reportData.columns.length;
                this.order = this.reportData.sorting;
            });
    };

    getCourseWiseUsageDetails(stateId: string, districtId: string, branchId: string, courseId: string) {
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
        this.reportType = 'courseWiseUsageDetails';

        this.avReportService.getCourseWiseUsageDetails(stateId, districtId, branchId, courseId, startDate, endDate)
            .subscribe(data => {
                this.detailedReportData = data;
                this.detailedReportGrandTotalColspan = this.detailedReportData.columns.length - this.detailedReportData.footerTotalColumns.length;
                let totalDuration: string;
                let totalSeconds: number = 0;
                let targetTotalDuration: string;
                let targetTotalSeconds: number = 0;
                let differenceTotalDuration: string;
                let differenceTotalSeconds: number = 0;
                let paddingZero = function (n) { return (n < 10 ? '0' : '') + n; }
                let courseWiseData: any = JSON.parse(this.detailedReportData.data);

                for (let i: number = 0; i < courseWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(courseWiseData[i].Duration.split(':')[2]) + (60 * parseInt(courseWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(courseWiseData[i].Duration.split(':')[0]));
                    let targetDurationInSeconds: number = parseInt(courseWiseData[i].Target.split(':')[2]) + (60 * parseInt(courseWiseData[i].Target.split(':')[1])) + (60 * 60 * parseInt(courseWiseData[i].Target.split(':')[0]));
                    let differenceDurationInSeconds: number = parseInt(courseWiseData[i].Diff.split(':')[2]) + (60 * parseInt(courseWiseData[i].Diff.split(':')[1])) + (60 * 60 * parseInt(courseWiseData[i].Diff.split(':')[0]));
                    totalSeconds += durationInSeconds;
                    targetTotalSeconds += targetDurationInSeconds;
                    differenceTotalSeconds += differenceDurationInSeconds;
                }

                let hours: number = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes: number = Math.floor(totalSeconds / 60);
                let seconds: number = totalSeconds % 60;
                totalDuration = paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds);
                let targetHours: number = Math.floor(targetTotalSeconds / 3600);
                targetTotalSeconds %= 3600;
                let targetMinutes: number = Math.floor(targetTotalSeconds / 60);
                let targetSeconds: number = targetTotalSeconds % 60;
                targetTotalDuration = paddingZero(targetHours) + ':' + paddingZero(targetMinutes) + ':' + paddingZero(targetSeconds);
                let differenceHours: number = Math.floor(differenceTotalSeconds / 3600);
                differenceTotalSeconds %= 3600;
                let differenceMinutes: number = Math.floor(differenceTotalSeconds / 60);
                let differenceSeconds: number = differenceTotalSeconds % 60;
                differenceTotalDuration = paddingZero(differenceHours) + ':' + paddingZero(differenceMinutes) + ':' + paddingZero(differenceSeconds);
                let totalStrength: number = courseWiseData.length > 0 ? courseWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength) : 0;
                let footerTotalValues: any[] = [];
                let footerTotalStrengthObject: any = {};
                footerTotalStrengthObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Strength')[0].align;
                footerTotalStrengthObject['value'] = totalStrength;
                footerTotalValues.push(footerTotalStrengthObject);
                let footerTargetTotalDurationObject: any = {};
                footerTargetTotalDurationObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Target')[0].align;
                footerTargetTotalDurationObject['value'] = targetTotalDuration;
                footerTotalValues.push(footerTargetTotalDurationObject);
                let footerTotalDurationObject: any = {};
                footerTotalDurationObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Duration')[0].align;
                footerTotalDurationObject['value'] = totalDuration;
                footerTotalValues.push(footerTotalDurationObject);
                let footerTotalDifferenceObject: any = {};
                footerTotalDifferenceObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Diff')[0].align;
                footerTotalDifferenceObject['value'] = '00:00:00';
                footerTotalValues.push(footerTotalDifferenceObject);
                let footerTotalPercentageObject: any = {};
                footerTotalPercentageObject['align'] = this.detailedReportData.footerTotalColumns.filter((item) => item.name === 'Per(%)')[0].align;
                footerTotalPercentageObject['value'] = '';
                footerTotalValues.push(footerTotalPercentageObject);
                this.detailedReportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < courseWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(courseWiseData[i].Duration.split(':')[2]) + (60 * parseInt(courseWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(courseWiseData[i].Duration.split(':')[0]));
                    courseWiseData[i]['Per(%)'] = totalDurationInSeconds !== 0 ? Math.round((durationInSeconds * 100) / totalDurationInSeconds) : '0';
                }

                this.detailedReportData['data'] = courseWiseData;
                this.detailedReportDataCount = courseWiseData.length;
                this.detailedReportNoDataColspan = this.reportData.columns.length;
                this.detailedReportOrder = this.reportData.sorting;
            });
    };

    getSubjectWiseUsageSummary() {
        let stateIds: any[] = [];
        let districtIds: any[] = [];
        let branchIds: any[] = [];
        let courseIds: any[] = [];
        let subjectIds: any[] = [];
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
        this.detailedReportType = 'subjectWiseDetailedReport';
        this.showTableOrChart = 'showTable';

        for (let i: number = 0; i < this.selectedStates.length; i++) {
            let state: any = this.states.filter((item) => item.stateId === this.selectedStates[i].stateId);
            stateIds.push(state[0].stateId);
        }

        for (let i: number = 0; i < this.selectedDistricts.length; i++) {
            let district: any = this.districts.filter((item) => item.districtId === this.selectedDistricts[i].districtId);
            districtIds.push(district[0].districtId);
        }

        for (let i: number = 0; i < this.selectedBranches.length; i++) {
            let branch: any = this.branches.filter((item) => item.branchId === this.selectedBranches[i].branchId);
            branchIds.push(branch[0].branchId);
        }

        for (let i: number = 0; i < this.selectedCourses.length; i++) {
            let course: any = this.courses.filter((item) => item.courseId === this.selectedCourses[i].courseId);
            courseIds.push(course[0].courseId);
        }

        if (this.selectedSubjects.length === 0) {
            for (let i: number = 0; i < this.subjects.length; i++) {
                subjectIds.push(this.subjects[i].subjectId);
            }
        }
        else {
            for (let i: number = 0; i < this.selectedSubjects.length; i++) {
                let subject: any = this.subjects.filter((item) => item.subjectId === this.selectedSubjects[i].subjectId);
                subjectIds.push(subject[0].subjectId);
            }
        }

        this.avReportService.getSubjectWiseUsageSummary(stateIds.join(','), districtIds.join(','), branchIds.join(','), courseIds.join(','), subjectIds.join(','), startDate, endDate)
            .subscribe(data => {
                this.showReportData = true;
                this.showChartData = false;
                this.showBarChart = false;
                this.showGroupBarChart = false;
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
                totalDuration = paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds);
                let totalStrength: number = subjectWiseData.length > 0 ? subjectWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength) : 0;
                let footerTotalValues: any[] = [];
                footerTotalValues.push(totalStrength);
                footerTotalValues.push(totalDuration);
                footerTotalValues.push('');
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < subjectWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(subjectWiseData[i].Duration.split(':')[2]) + (60 * parseInt(subjectWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(subjectWiseData[i].Duration.split(':')[0]));
                    subjectWiseData[i]['Per(%)'] = totalDurationInSeconds !== 0 ? Math.round((durationInSeconds * 100) / totalDurationInSeconds) : '0';
                }

                this.reportData['data'] = subjectWiseData;
                this.dataCount = subjectWiseData.length;
                this.noDataColspan = this.reportData.columns.length;
                this.order = this.reportData.sorting;
            });
    };

    getSubjectWiseUsageDetails(stateId: string, districtId: string, branchId: string, courseId: string, subjectId: string) {
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;

        this.avReportService.getSubjectWiseUsageDetails(stateId, districtId, branchId, courseId, subjectId, startDate, endDate)
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
                totalDuration = paddingZero(hours) + ':' + paddingZero(minutes) + ':' + paddingZero(seconds);
                let totalStrength: number = subjectWiseData.length > 0 ? subjectWiseData.map(item => parseInt(item.Strength) || 0).reduce((strength, item) => item + strength) : 0;
                let footerTotalValues: any[] = [];
                footerTotalValues.push(totalStrength);
                footerTotalValues.push(totalDuration);
                footerTotalValues.push('');
                footerTotalValues.push('');
                this.reportData['footerTotalValues'] = footerTotalValues;
                let totalDurationInSeconds: number = parseInt(totalDuration.split(':')[2]) + (60 * parseInt(totalDuration.split(':')[1])) + (60 * 60 * parseInt(totalDuration.split(':')[0]));

                for (let i: number = 0; i < subjectWiseData.length; i++) {
                    let durationInSeconds: number = parseInt(subjectWiseData[i].Duration.split(':')[2]) + (60 * parseInt(subjectWiseData[i].Duration.split(':')[1])) + (60 * 60 * parseInt(subjectWiseData[i].Duration.split(':')[0]));
                    subjectWiseData[i]['Per(%)'] = totalDurationInSeconds !== 0 ? Math.round((durationInSeconds * 100) / totalDurationInSeconds) : '0';
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

    detailedReportSetOrder(value: string) {
        if (this.detailedReportOrder === value) {
            this.detailedReportReverse = !this.detailedReportReverse;
        }

        this.detailedReportOrder = value;
    };

    getTargetDuration(item: string) {
        let state: any[] = [];
        let district: any[] = [];
        let branch: any[] = [];
        let course: any[] = [];
        let targetDuration: string = '';

        switch (this.reportType) {
            case 'stateWiseUsageSummary':
                state = this.reportData.data.filter((e) => e.State === item);
                targetDuration = state[0].Duration;
                break;
            case 'stateWiseUsageDetails':
                district = this.detailedReportData.data.filter((e) => e.District === item);
                targetDuration = district[0].Duration;
                break;
            case 'districtWiseUsageSummary':
                district = this.reportData.data.filter((e) => e.District === item);
                targetDuration = district[0].Duration;
                break;
            case 'districtWiseUsageDetails':
                branch = this.detailedReportData.data.filter((e) => e.Branch === item);
                targetDuration = branch[0].Duration;
                break;
            case 'branchWiseUsageSummary':
                branch = this.reportData.data.filter((e) => e.Branch === item);
                targetDuration = branch[0].Duration;
                break;
            case 'branchWiseUsageDetails':
                course = this.detailedReportData.data.filter((e) => e.Course === item);
                targetDuration = course[0].Duration;
                break;
            case 'courseWiseUsageSummary':
                course = this.reportData.data.filter((e) => e.Course === item);
                targetDuration = course[0].Duration;
                break;
            case 'courseWiseUsageDetails':
                course = this.detailedReportData.data.filter((e) => e.Course === item);
                targetDuration = course[0].Duration;
                break;
        }

        return targetDuration;
    };

    showTable() {
        this.showReportData = true;
        this.showChartData = false;
    };

    showChart() {
        this.showReportData = false;
        this.showChartData = true;

        if (this.reportType === 'courseWiseUsageSummary' || this.reportType === 'courseWiseUsageDetails')
            this.showGroupBarChart = true;
        else
            this.showBarChart = true;
    };
}