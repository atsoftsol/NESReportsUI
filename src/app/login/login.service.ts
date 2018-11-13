import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/retry';

@Injectable()
export class LoginService {
    constructor(private httpClient: HttpClient) { }

    login(username: string, password: string): Observable<any> {
        return this.httpClient
            .post<any>(environment.apiEndPoint + environment.loginConfig.login, { 'username': username, 'password': password })
            .retry(environment.retryFailedRequest);
    };
}