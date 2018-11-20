import { Component, Directive, HostListener, Renderer2, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { getBodyNode } from '@angular/animations/browser/src/render/shared';


@Component({
    templateUrl: 'header.component.html',
    selector: 'app-header'
})

export class HeaderComponent {
    route: string = '';
    headerTitle: string = '';

    constructor(private render: Renderer2, private el: ElementRef, location: Location, router: Router) {
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

    private stateClassRef = {
        normal: "hold-transition skin-orange-light sidebar-mini",
        collapsed: "hold-transition skin-orange-light sidebar-mini sidebar-collapse"
      }
      private state = "normal";

      @HostListener('click') toggleState() {
        this.state = this.state === "normal" ? "collapsed": "normal";
        // do the toggling.
        this.el.nativeElement.closest('body').className = this.stateClassRef[this.state];
      }

};