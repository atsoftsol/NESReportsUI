import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/retry';

@Injectable()
export class AVReportService {
    constructor(private httpClient: HttpClient) { }

    getStateWiseUsageSummary(stateCodes: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getStateWiseUsageSummary.replace(/{stateCodes}/g, stateCodes).replace(/{startDate}/g, startDate).replace(/{endDate}/g, endDate))
            .retry(environment.retryFailedRequest);
    };

    getStateWiseUsageDetails(stateCodes: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getStateWiseUsageDetails.replace(/{stateCodes}/g, stateCodes).replace(/{startDate}/g, startDate).replace(/{endDate}/g, endDate))
            .retry(environment.retryFailedRequest);
    };

    getDistrictWiseUsageSummary(stateCodes: string, districtCodes: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getDistrictWiseUsageSummary.replace(/{stateCodes}/g, stateCodes).replace(/{districtCodes}/g, districtCodes).replace(/{startDate}/g, startDate).replace(/{endDate}/g, endDate))
            .retry(environment.retryFailedRequest);
    };

    getDistrictWiseUsageDetails(stateCode: string, districtCode: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getDistrictWiseUsageDetails.replace(/{stateCode}/g, stateCode).replace(/{districtCode}/g, districtCode).replace(/{startDate}/g, startDate).replace(/{endDate}/g, endDate))
            .retry(environment.retryFailedRequest);
    };

    getBranchWiseUsageSummary(stateCodes: string, districtCodes: string, branchCodes: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getBranchWiseUsageSummary.replace(/{stateCodes}/g, stateCodes).replace(/{districtCodes}/g, districtCodes).replace(/{branchCodes}/g, branchCodes).replace(/{startDate}/g, startDate).replace(/{endDate}/g, endDate))
            .retry(environment.retryFailedRequest);
    };

    getBranchWiseUsageDetails(stateCode: string, districtCode: string, branchCode: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getBranchWiseUsageDetails.replace(/{stateCode}/g, stateCode).replace(/{districtCode}/g, districtCode).replace(/{branchCode}/g, branchCode).replace(/{startDate}/g, startDate).replace(/{endDate}/g, endDate))
            .retry(environment.retryFailedRequest);
    };

    getCourseWiseUsageSummary(stateCodes: string, districtCodes: string, branchCodes: string, courseCode: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getCourseWiseUsageSummary.replace(/{stateCodes}/g, stateCodes).replace(/{districtCodes}/g, districtCodes).replace(/{branchCodes}/g, branchCodes).replace(/{courseCode}/g, courseCode).replace(/{startDate}/g, startDate).replace(/{endDate}/g, endDate))
            .retry(environment.retryFailedRequest);
    };

    getCourseWiseUsageDetails(stateCode: string, districtCode: string, branchCode: string, courseCode: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getCourseWiseUsageDetails.replace(/{stateCode}/g, stateCode).replace(/{districtCode}/g, districtCode).replace(/{branchCode}/g, branchCode).replace(/{courseCode}/g, courseCode).replace(/{startDate}/g, startDate).replace(/{endDate}/g, endDate))
            .retry(environment.retryFailedRequest);
    };

    getSubjectWiseUsageSummary(stateCodes: string, districtCodes: string, branchCodes: string, courseCodes: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getSubjectWiseUsageSummary.replace(/{stateCodes}/g, stateCodes).replace(/{districtCodes}/g, districtCodes).replace(/{branchCodes}/g, branchCodes).replace(/{courseCodes}/g, courseCodes).replace(/{startDate}/g, startDate).replace(/{endDate}/g, endDate))
            .retry(environment.retryFailedRequest);
    };

    getSubjectWiseUsageDetails(stateCodes: string, districtCodes: string, branchCodes: string, courseCodes: string, subjectCode: string, startDate: string, endDate: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.avReportConfig.getSubjectWiseUsageDetails.replace(/{stateCodes}/g, stateCodes).replace(/{districtCodes}/g, districtCodes).replace(/{branchCodes}/g, branchCodes).replace(/{courseCodes}/g, courseCodes).replace(/{subjectCode}/g, subjectCode).replace(/{startDate}/g, startDate).replace(/{endDate}/g, endDate))
            .retry(environment.retryFailedRequest);
    };
}