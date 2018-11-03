import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/retry';

@Injectable()
export class AVReportService {
    constructor(private httpClient: HttpClient) { }

    getStateWiseUsageSummary(stateIds: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getStateWiseUsageSummary, { params: new HttpParams().set('stateIds', stateIds).set('startDate', startDate).set('endDate', endDate) })
            .retry(environment.retryFailedRequest);
    };

    getStateWiseUsageDetails(stateId: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getStateWiseUsageDetails.replace(/{stateId}/g, stateId).replace(/{startDate}/g, startDate).replace(/{endDate}/g, endDate))
            .retry(environment.retryFailedRequest);
    };

    getDistrictWiseUsageSummary(stateIds: string, districtIds: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getDistrictWiseUsageSummary, { params: new HttpParams().set('stateIds', stateIds).set('districtIds', districtIds).set('startDate', startDate).set('endDate', endDate) })
            .retry(environment.retryFailedRequest);
    };

    getDistrictWiseUsageDetails(stateId: string, districtId: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getDistrictWiseUsageDetails.replace(/{stateId}/g, stateId).replace(/{districtId}/g, districtId).replace(/{startDate}/g, startDate).replace(/{endDate}/g, endDate))
            .retry(environment.retryFailedRequest);
    };

    getBranchWiseUsageSummary(stateIds: string, districtIds: string, branchIds: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getBranchWiseUsageSummary, { params: new HttpParams().set('stateIds', stateIds).set('districtIds', districtIds).set('branchIds', branchIds).set('startDate', startDate).set('endDate', endDate) })
            .retry(environment.retryFailedRequest);
    };

    getBranchWiseUsageDetails(stateId: string, districtId: string, branchId: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getBranchWiseUsageDetails.replace(/{stateId}/g, stateId).replace(/{districtId}/g, districtId).replace(/{branchId}/g, branchId).replace(/{startDate}/g, startDate).replace(/{endDate}/g, endDate))
            .retry(environment.retryFailedRequest);
    };

    getCourseWiseUsageSummary(stateIds: string, districtIds: string, branchIds: string, courseIds: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getCourseWiseUsageSummary, { params: new HttpParams().set('stateIds', stateIds).set('districtIds', districtIds).set('branchIds', branchIds).set('courseIds', courseIds).set('startDate', startDate).set('endDate', endDate) })
            .retry(environment.retryFailedRequest);
    };

    getCourseWiseUsageDetails(stateId: string, districtId: string, branchId: string, courseId: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getCourseWiseUsageDetails.replace(/{stateId}/g, stateId).replace(/{districtId}/g, districtId).replace(/{branchId}/g, branchId).replace(/{courseId}/g, courseId).replace(/{startDate}/g, startDate).replace(/{endDate}/g, endDate))
            .retry(environment.retryFailedRequest);
    };

    getSubjectWiseUsageSummary(stateIds: string, districtIds: string, branchIds: string, courseIds: string, subjectIds: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getSubjectWiseUsageSummary, { params: new HttpParams().set('stateIds', stateIds).set('districtIds', districtIds).set('branchIds', branchIds).set('courseIds', courseIds).set('subjectIds', subjectIds).set('startDate', startDate).set('endDate', endDate) })
            .retry(environment.retryFailedRequest);
    };

    getSubjectWiseUsageDetails(stateId: string, districtId: string, branchId: string, courseId: string, subjectId: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getSubjectWiseUsageDetails.replace(/{stateId}/g, stateId).replace(/{districtId}/g, districtId).replace(/{branchId}/g, branchId).replace(/{courseId}/g, courseId).replace(/{subjectId}/g, subjectId).replace(/{startDate}/g, startDate).replace(/{endDate}/g, endDate))
            .retry(environment.retryFailedRequest);
    };
}
