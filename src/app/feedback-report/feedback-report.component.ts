import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../app.service';
import { FeedbackReportService } from './feedback-report.service';

@Component({
    templateUrl: 'feedback-report.component.html'
})

export class FeedbackReportComponent implements OnInit {
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
    startDate: NgbDateStruct;
    endDate: NgbDateStruct;
    maxDate: NgbDateStruct;
    serial: number = 1;
    feedbackData: any = [];
    showFeedbackData: boolean = false;
    order: string;
    reverse: boolean = false;
    dataCount: number;
    noDataColspan: number;
    reportType: string = '';

    constructor(private calendar: NgbCalendar, private appService: AppService, private feedbackReportService: FeedbackReportService) {
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

    selectState() {
        let stateIds: any[] = [];
        this.selectedDistricts = [];
        this.selectedBranches = [];
        this.selectedCourses = [];
        this.districts = [];
        this.branches = [];

        this.selectedStates.forEach((item) => {
            stateIds.push(item.stateId);
        });

        this.getStateWiseSummary();

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

        this.selectedStates.forEach((item) => {
            stateIds.push(item.stateId);
        });

        this.getStateWiseSummary();

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

        this.selectedStates.forEach((item) => {
            stateIds.push(item.stateId);
        });

        if (this.selectedStates.length > 0) {
            this.getStateWiseSummary();
        }
        else {
            this.showFeedbackData = false;
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
        this.showFeedbackData = false;
    };

    selectDistrict() {
        let districtIds: any[] = [];
        this.selectedBranches = [];
        this.selectedCourses = [];
        this.branches = [];

        this.selectedDistricts.forEach((item) => {
            districtIds.push(item.districtId);
        });

        this.getDistrictWiseSummary();

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

        this.selectedDistricts.forEach((item) => {
            districtIds.push(item.districtId);
        });

        this.getDistrictWiseSummary();

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

        this.selectedDistricts.forEach((item) => {
            districtIds.push(item.districtId);
        });

        if (this.selectedDistricts.length > 0) {
            this.getDistrictWiseSummary();
        }
        else {
            this.getStateWiseSummary();
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
        this.getStateWiseSummary();
    };

    selectBranch() {
        this.selectedCourses = [];
        this.getBranchWiseSummary();
    };

    selectAllBranches() {
        this.selectedBranches = this.branches;
        this.selectedCourses = [];
        this.getBranchWiseSummary();
    };

    unSelectBranch() {
        this.selectedCourses = [];

        if (this.selectedBranches.length > 0) {
            this.getBranchWiseSummary();
        }
        else {
            this.getDistrictWiseSummary();
        }
    };

    unSelectAllBranches() {
        this.selectedBranches = [];
        this.selectedCourses = [];
        this.getDistrictWiseSummary();
    };

    selectCourse() {
        this.getCourseWiseSummary();
    };

    selectAllCourses() {
        this.selectedCourses = this.courses;
        this.getCourseWiseSummary();
    };

    unSelectCourse() {
        if (this.selectedCourses.length > 0) {
            this.getCourseWiseSummary();
        }
        else {
            this.getBranchWiseSummary();
        }
    };

    unSelectAllCourses() {
        this.selectedCourses = [];
        this.getBranchWiseSummary();
    };

    getStateWiseSummary() {
        let stateIds: any[] = [];
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
        this.reportType = 'stateWiseSummary';

        this.selectedStates.forEach((item) => {
            stateIds.push(item.stateId);
        });

        this.feedbackReportService.getStateWiseSummary(stateIds.join(','), startDate, endDate)
            .subscribe(data => {
                this.showFeedbackData = true;
                this.feedbackData = data;
                this.feedbackData['data'] = JSON.parse(this.feedbackData.data);
                this.dataCount = this.feedbackData.data.length;
                this.noDataColspan = this.feedbackData.columns.length;
                this.order = this.feedbackData.sorting;
            }, error => {

            });
    };

    getDistrictWiseSummary() {
        let stateIds: any[] = [];
        let districtIds: any[] = [];
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
        this.reportType = 'districtWiseSummary';

        this.selectedStates.forEach((item) => {
            stateIds.push(item.stateId);
        });

        this.selectedDistricts.forEach((item) => {
            districtIds.push(item.districtId);
        });

        this.feedbackReportService.getDistrictWiseSummary(stateIds.join(','), districtIds.join(','), startDate, endDate)
            .subscribe(data => {
                this.showFeedbackData = true;
                this.feedbackData = data;
                this.feedbackData['data'] = JSON.parse(this.feedbackData.data);
                this.dataCount = this.feedbackData.data.length;
                this.noDataColspan = this.feedbackData.columns.length;
                this.order = this.feedbackData.sorting;
            }, error => {

            });
    };

    getBranchWiseSummary() {
        let stateIds: any[] = [];
        let districtIds: any[] = [];
        let branchIds: any[] = [];
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
        this.reportType = 'branchWiseSummary';

        this.selectedStates.forEach((item) => {
            stateIds.push(item.stateId);
        });

        this.selectedDistricts.forEach((item) => {
            districtIds.push(item.districtId);
        });

        this.selectedBranches.forEach((item) => {
            branchIds.push(item.branchId);
        });

        this.feedbackReportService.getBranchWiseSummary(stateIds.join(','), districtIds.join(','), branchIds.join(','), startDate, endDate)
            .subscribe(data => {
                this.showFeedbackData = true;
                this.feedbackData = data;
                this.feedbackData['data'] = JSON.parse(this.feedbackData.data);
                this.dataCount = this.feedbackData.data.length;
                this.noDataColspan = this.feedbackData.columns.length;
                this.order = this.feedbackData.sorting;
            }, error => {

            });
    };

    getCourseWiseSummary() {
        let stateIds: any[] = [];
        let districtIds: any[] = [];
        let branchIds: any[] = [];
        let courseIds: any[] = [];
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
        this.reportType = 'courseWiseSummary';

        this.selectedStates.forEach((item) => {
            stateIds.push(item.stateId);
        });

        this.selectedDistricts.forEach((item) => {
            districtIds.push(item.districtId);
        });

        this.selectedBranches.forEach((item) => {
            branchIds.push(item.branchId);
        });

        this.selectedCourses.forEach((item) => {
            courseIds.push(item.courseId);
        });

        this.feedbackReportService.getCourseWiseSummary(stateIds.join(','), districtIds.join(','), branchIds.join(','), courseIds.join(','), startDate, endDate)
            .subscribe(data => {
                this.showFeedbackData = true;
                this.feedbackData = data;
                this.feedbackData['data'] = JSON.parse(this.feedbackData.data);
                this.dataCount = this.feedbackData.data.length;
                this.noDataColspan = this.feedbackData.columns.length;
                this.order = this.feedbackData.sorting;
            }, error => {

            });
    };

    onStartDateSelect() {
        switch (this.reportType) {
            case 'stateWiseSummary':
                this.getStateWiseSummary();
                break;
            case 'districtWiseSummary':
                this.getDistrictWiseSummary();
                break;
            case 'branchWiseSummary':
                this.getBranchWiseSummary();
                break;
            case 'courseWiseSummary':
                this.getCourseWiseSummary();
                break;
        }
    };

    onEndDateSelect() {
        switch (this.reportType) {
            case 'stateWiseSummary':
                this.getStateWiseSummary();
                break;
            case 'districtWiseSummary':
                this.getDistrictWiseSummary();
                break;
            case 'branchWiseSummary':
                this.getBranchWiseSummary();
                break;
            case 'courseWiseSummary':
                this.getCourseWiseSummary();
                break;
        }
    };

    setOrder(value: string) {
        if (this.order === value) {
            this.reverse = !this.reverse;
        }

        this.order = value;
    };
}