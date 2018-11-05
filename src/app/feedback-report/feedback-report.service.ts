import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/retry';

@Injectable()
export class FeedbackReportService {
    constructor(private httpClient: HttpClient) { }

    getStateWiseSummary(stateIds: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.feedbackReportConfig.getStateWiseSummary, { params: new HttpParams().set('stateIds', stateIds).set('startDate', startDate).set('endDate', endDate) })
            .retry(environment.retryFailedRequest);
    };

    getDistrictWiseSummary(stateIds: string, districtIds: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.feedbackReportConfig.getDistrictWiseSummary, { params: new HttpParams().set('stateIds', stateIds).set('districtIds', districtIds).set('startDate', startDate).set('endDate', endDate) })
            .retry(environment.retryFailedRequest);
    };

    getBranchWiseSummary(stateIds: string, districtIds: string, branchIds: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.feedbackReportConfig.getBranchWiseSummary, { params: new HttpParams().set('stateIds', stateIds).set('districtIds', districtIds).set('branchIds', branchIds).set('startDate', startDate).set('endDate', endDate) })
            .retry(environment.retryFailedRequest);
    };

    getCourseWiseSummary(stateIds: string, districtIds: string, branchIds: string, courseIds: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.feedbackReportConfig.getCourseWiseSummary, { params: new HttpParams().set('stateIds', stateIds).set('districtIds', districtIds).set('branchIds', branchIds).set('courseIds', courseIds).set('startDate', startDate).set('endDate', endDate) })
            .retry(environment.retryFailedRequest);
    };
}