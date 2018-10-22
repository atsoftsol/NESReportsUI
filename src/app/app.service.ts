import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/retry';

@Injectable()
export class AppService {
    constructor(private httpClient: HttpClient) { }

    getStates(): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.commonConfig.getStates)
            .retry(environment.retryFailedRequest);
    }

    getDistricts(stateIds: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.commonConfig.getDistricts.replace(/{stateIds}/g, stateIds))
            .retry(environment.retryFailedRequest);
    }

    getBranches(districtIds: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.commonConfig.getBranches.replace(/{districtIds}/g, districtIds))
            .retry(environment.retryFailedRequest);
    };

    getCourses(): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.commonConfig.getCourses)
            .retry(environment.retryFailedRequest);
    };

    getSubjects(): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.commonConfig.getSubjects)
            .retry(environment.retryFailedRequest);
    };
}