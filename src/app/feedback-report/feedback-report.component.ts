import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../app.service';
import { FeedbackReportService } from './feedback-report.service';
import { ExcelService } from '../excel.service';

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
    feedbackTypes: any[] = [];
    selectedFeedbackTypeId: string;
    categories: any[] = [];
    categoryDropdownSettings: any;
    selectedCategories: any[] = [];
    subCategories: any[] = [];
    subCategoryDropdownSettings: any;
    selectedSubCategories: any[] = [];
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

    constructor(private calendar: NgbCalendar, private appService: AppService, private feedbackReportService: FeedbackReportService, private excelService: ExcelService) {
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
        this.categoryDropdownSettings = {
            singleSelection: false,
            idField: 'feedBackCategoryId',
            textField: 'feedBackCategoryName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 1,
            allowSearchFilter: true
        };
        this.subCategoryDropdownSettings = {
            singleSelection: false,
            idField: 'subCategoryId',
            textField: 'subCategoryName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 1,
            allowSearchFilter: true
        };
    };

    sampledata: any = [{
        eid: 'e101',
        ename: 'ravi',
        esal: 1000
        },{
        eid: 'e102',
        ename: 'ram',
        esal: 2000
        },{
        eid: 'e103',
        ename: 'rajesh',
        esal: 3000
        }];

    ngOnInit() {
        this.getStates();
        this.getCourses();
        this.getFeedbackTypes();
        this.getCategories();
        this.getDates();
    };

    exportAsXLSX(): void {
        alert('Clicked')
        this.excelService.exportAsExcelFile(this.sampledata,'sample')
    }

    getStates() {
        this.appService.getStates()
            .subscribe(data => {
                this.states = data;
            }, error => {

            });
    };

    getCourses() {
        this.appService.getCourses()
            .subscribe(data => {
                this.courses = data;
            }, error => {

            });
    };

    getFeedbackTypes() {
        this.feedbackReportService.getFeedbackTypes()
            .subscribe(data => {
                this.feedbackTypes = data;
                this.selectedFeedbackTypeId = this.feedbackTypes[0].feedBackTypeId;
            }, error => {

            });
    };

    getCategories() {
        this.feedbackReportService.getCategories()
            .subscribe(data => {
                this.categories = data;
            }, error => {

            });
    };

    getDates() {
        this.startDate = this.calendar.getPrev(this.calendar.getToday(), 'd', 30);
        this.endDate = this.calendar.getToday();
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

    selectFeedbackType(event: any) {
        this.selectedFeedbackTypeId = event.target.value;

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

    selectCategory() {
        let categoryIds: any[] = [];
        this.selectedSubCategories = [];
        this.subCategories = [];

        this.selectedCategories.forEach((item) => {
            categoryIds.push(item.feedBackCategoryId);
        });

        this.feedbackReportService.getSubCategories(categoryIds.join(','))
            .subscribe(data => {
                this.subCategories = data;
            }, error => {

            });

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

    selectAllCategories() {
        let categoryIds: any[] = [];
        this.selectedCategories = this.categories;
        this.selectedSubCategories = [];
        this.subCategories = [];

        this.selectedCategories.forEach((item) => {
            categoryIds.push(item.feedBackCategoryId);
        });

        this.feedbackReportService.getSubCategories(categoryIds.join(','))
            .subscribe(data => {
                this.subCategories = data;
            }, error => {

            });

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

    unSelectCategory() {
        let categoryIds: any[] = [];
        this.selectedSubCategories = [];
        this.subCategories = [];

        this.selectedCategories.forEach((item) => {
            categoryIds.push(item.feedBackCategoryId);
        });

        this.feedbackReportService.getSubCategories(categoryIds.join(','))
            .subscribe(data => {
                this.subCategories = data;
            }, error => {

            });

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

    unSelectAllCategories() {
        this.selectedCategories = [];
        this.selectedSubCategories = [];
        this.subCategories = [];

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

    selectSubCategory() {

    };

    selectAllSubCategories() {

    };

    unSelectSubCategory() {

    };

    unSelectAllSubCategories() {

    };

    getStateWiseSummary() {
        let stateIds: any[] = [];
        let categoryIds: any[] = [];
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
        this.reportType = 'stateWiseSummary';

        this.selectedStates.forEach((item) => {
            stateIds.push(item.stateId);
        });

        this.selectedCategories.forEach((item) => {
            categoryIds.push(item.feedBackCategoryId);
        });

        this.feedbackReportService.getStateWiseSummary(stateIds.join(','), this.selectedFeedbackTypeId, categoryIds.join(','), startDate, endDate)
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
        let categoryIds: any[] = [];
        let startDate: string = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        let endDate: string = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
        this.reportType = 'districtWiseSummary';

        this.selectedStates.forEach((item) => {
            stateIds.push(item.stateId);
        });

        this.selectedDistricts.forEach((item) => {
            districtIds.push(item.districtId);
        });

        this.selectedCategories.forEach((item) => {
            categoryIds.push(item.feedBackCategoryId);
        });

        this.feedbackReportService.getDistrictWiseSummary(stateIds.join(','), districtIds.join(','), this.selectedFeedbackTypeId, categoryIds.join(','), startDate, endDate)
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
        let categoryIds: any[] = [];
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

        this.selectedCategories.forEach((item) => {
            categoryIds.push(item.feedBackCategoryId);
        });

        this.feedbackReportService.getBranchWiseSummary(stateIds.join(','), districtIds.join(','), branchIds.join(','), this.selectedFeedbackTypeId, categoryIds.join(','), startDate, endDate)
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
        let categoryIds: any[] = [];
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

        this.selectedCategories.forEach((item) => {
            categoryIds.push(item.feedBackCategoryId);
        });

        this.feedbackReportService.getCourseWiseSummary(stateIds.join(','), districtIds.join(','), branchIds.join(','), courseIds.join(','), this.selectedFeedbackTypeId, categoryIds.join(','), startDate, endDate)
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