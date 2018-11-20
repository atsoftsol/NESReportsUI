import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
            .get<any>(environment.apiEndPoint + environment.commonConfig.getDistricts, { params: new HttpParams().set('stateIds', stateIds) })
            .retry(environment.retryFailedRequest);
    }

    getBranches(districtIds: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.commonConfig.getBranches, { params: new HttpParams().set('districtIds', districtIds) })
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

    getInspectionReporttypes(): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.commonConfig.getInspectionReportTypes)
            .retry(environment.retryFailedRequest);
    };

    getInspectionCategory(): Observable<any> {
        return this.httpClient
        .get<any>(environment.apiEndPoint + environment.commonConfig.getInspectionCategories)
        .retry(environment.retryFailedRequest);
    };
}