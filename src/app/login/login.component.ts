import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
    templateUrl: 'login.component.html',
    styles: [`.login-image{
        background-image: url('../../assets/images/lbg.jpg') !important; 
    }`],
    encapsulation: ViewEncapsulation.None
})

export class LoginComponent {
    username: string;
    password: string;

    constructor(private router: Router, private loginService: LoginService) {

    }

    login(username: string, password: string) {
        this.loginService.login(username, password)
            .subscribe(data => {
                this.router.navigate(['/av-report']);
            }, error => {
                alert('login failed');
            });
    }
}