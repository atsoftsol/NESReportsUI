import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
    templateUrl: 'header.component.html',
    selector: 'app-header'
})

export class HeaderComponent {
    route: string = '';
    headerTitle: string = '';

    constructor(location: Location, router: Router) {
        router.events.subscribe(() => {
            if (location.path() != '') {
                this.route = location.path();
            }

            switch (this.route) {
                case '/av-report':
                    this.headerTitle = 'Digital Class Room Usage Details';
                    break;
                case '/feedback-report':
                    this.headerTitle = 'Feedback Report';
                    break;
                case '/inspection-report':
                    this.headerTitle = 'Inspection Report';
                    break;
            }
        });
    };
};