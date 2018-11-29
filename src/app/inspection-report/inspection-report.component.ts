import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../app.service';

@Component({
    templateUrl: 'inspection-report.component.html'
})

export class InspectionReportComponent implements OnInit {
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
    reportTypes: any[] = [];
    reportTypeDropdownSettings: any;
    selectedReportTypes: any[] = [];
    inspectionCategories: any[] = [];
    inspectionCategoryDropdownSettings: any;
    selectedInspectionCategories: any[] = [];
    inspectionSubCategories: any[] = [];
    inspectionSubCategoryDropdownSettings: any;
    selectedInspectionSubCategories: any[] = [];
    maxDate: NgbDateStruct;
    startDate: NgbDateStruct;
    endDate: NgbDateStruct;
    reportData: any = [];
    order: string;
    reverse: boolean = false;

    constructor(private calendar: NgbCalendar, private appService: AppService) {
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
        this.reportTypeDropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'type',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 1,
            allowSearchFilter: true
        };
        this.inspectionCategoryDropdownSettings = {
            singleSelection: false,
            idField: 'categoryId',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 1,
            allowSearchFilter: true
        };
        this.inspectionSubCategoryDropdownSettings = {
            singleSelection: false,
            idField: 'subCategoryId',
            textField: 'name',
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
        this.getReportTypes();
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

    getReportTypes() {
        this.appService.getInspectionReportTypes()
            .subscribe(data => {
                this.reportTypes = data;
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
    };

    selectDistrict() {
        let districtIds: any[] = [];
        this.selectedBranches = [];
        this.selectedCourses = [];
        this.branches = [];

        for (let i: number = 0; i < this.selectedDistricts.length; i++) {
            districtIds.push(this.selectedDistricts[i].districtId);
        }

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
    };

    getInspectionCategories() {
        let reportTypeIds: any[] = [];

        this.selectedReportTypes.forEach((item) => {
            reportTypeIds.push(item.id);
        });

        this.appService.getInspectionCategory(reportTypeIds.join(','))
            .subscribe(data => {
                this.inspectionCategories = data;
            });
    };

    getInspectionSubCategories() {
        let reportTypeIds: any[] = [];
        let categoryIds: any[] = [];

        this.selectedReportTypes.forEach((item) => {
            reportTypeIds.push(item.id);
        });

        this.selectedInspectionCategories.forEach((item) => {
            categoryIds.push(item.categoryId);
        });

        this.appService.getInspectionSubCategories(reportTypeIds.join(','), categoryIds.join(','))
            .subscribe(data => {
                this.inspectionSubCategories = data;
            });
    };

    selectReportType() {
        this.selectedInspectionCategories = [];
        this.selectedInspectionSubCategories = [];
        this.inspectionCategories = [];
        this.inspectionSubCategories = [];
        this.getInspectionCategories();
    };

    selectAllReportTypes() {
        this.selectedReportTypes = this.reportTypes;
        this.selectedInspectionSubCategories = [];
        this.inspectionSubCategories = [];
        this.getInspectionCategories();
    };

    unSelectReportType() {
        this.selectedInspectionCategories = [];
        this.selectedInspectionSubCategories = [];
        this.inspectionCategories = [];
        this.inspectionSubCategories = [];
        this.getInspectionCategories();
    };

    unSelectAllReportTypes() {
        this.selectedReportTypes = [];
        this.selectedInspectionCategories = [];
        this.selectedInspectionSubCategories = [];
        this.inspectionCategories = [];
        this.inspectionSubCategories = [];
    };

    selectInspectionCategory() {
        this.selectedInspectionSubCategories = [];
        this.inspectionSubCategories = [];
        this.getInspectionSubCategories();
    };

    selectAllInspectionCategories() {
        this.selectedInspectionCategories = this.inspectionCategories;
        this.selectedInspectionSubCategories = [];
        this.inspectionSubCategories = [];
        this.getInspectionSubCategories();
    };

    unSelectInspectionCategory() {
        this.selectedInspectionSubCategories = [];
        this.inspectionSubCategories = [];
        this.getInspectionSubCategories();
    };

    unSelectAllInspectionCategories() {
        this.selectedInspectionCategories = [];
        this.selectedInspectionSubCategories = [];
        this.inspectionSubCategories = [];
    };
}