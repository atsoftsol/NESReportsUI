import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'branch-wise.component.html',
    selector: 'branch-wise'
})

export class AVReportBranchWiseComponent implements OnInit {
    branchWiseList: any[];
    dataCount: number;
    page: number = 1;
    order: string = 'percentage';
    reverse: boolean = false;

    constructor() {

    }

    ngOnInit() {
        this.branchWiseList = [{
            'schoolName': 'WB-FULBARI-BOYS-423',
            'principal': 'Rajani Prasad',
            'stuStn': 307,
            'duration': '20:10:24',
            'percentage': 14
        }, {
            'schoolName': 'WB-SILIGURI-BOYS-404',
            'principal': 'Leena',
            'stuStn': 250,
            'duration': '20:09:14',
            'percentage': 14
        }, {
            'schoolName': 'WB-BARDHWAN-442',
            'principal': 'Jayashree',
            'stuStn': 307,
            'duration': '15:20:27',
            'percentage': 11
        }, {
            'schoolName': 'WB-HALDIA-496',
            'principal': 'Shravan',
            'stuStn': 332,
            'duration': '15:19:57',
            'percentage': 11
        }, {
            'schoolName': 'WB-ANDUL-435',
            'principal': 'Kruthika',
            'stuStn': 525,
            'duration': '13:29:38',
            'percentage': 10
        }, {
            'schoolName': 'WB-RISHRA-441',
            'principal': 'Ashraf',
            'stuStn': 413,
            'duration': '11:50:31',
            'percentage': 8
        }, {
            'schoolName': 'WB-SONARPUR-486',
            'principal': 'Saswathi',
            'stuStn': 220,
            'duration': '11:03:40',
            'percentage': 8
        }, {
            'schoolName': 'WB-KAL TOWN-440',
            'principal': 'Revathi',
            'stuStn': 440,
            'duration': '10:34:01',
            'percentage': 8
        }, {
            'schoolName': 'WB-BARASAT-437',
            'principal': 'Nupur',
            'stuStn': 219,
            'duration': '07:08:31',
            'percentage': 5
        }, {
            'schoolName': 'WB-ASANSOL-406',
            'principal': 'Mousami',
            'stuStn': 694,
            'duration': '06:30:09',
            'percentage': 5
        }];
        this.dataCount = this.branchWiseList.length;
    }

    setOrder(value: string) {
        if (this.order === value) {
            this.reverse = !this.reverse;
        }

        this.order = value;
    }
}