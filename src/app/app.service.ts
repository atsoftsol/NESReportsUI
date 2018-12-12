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

    getContent(): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.commonConfig.getContent)
            .retry(environment.retryFailedRequest);
    };

    getInspectionReportTypes(): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.commonConfig.getInspectionReportTypes)
            .retry(environment.retryFailedRequest);
    };

    getInspectionCategory(reportType: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.commonConfig.getInspectionCategories, { params: new HttpParams().set('reportType', reportType) })
            .retry(environment.retryFailedRequest);
    };

    getInspectionSubCategories(reportTypeIds: string, categoryIds: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.commonConfig.getInspectionSubCategories, { params: new HttpParams().set('reporttype', reportTypeIds).set('category', categoryIds) })
            .retry(environment.retryFailedRequest);
    };
}