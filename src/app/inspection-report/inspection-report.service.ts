import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class InspectionReportService {
    constructor(private httpClient: HttpClient) { }

    getStates(): Observable<Array<any>[]> {
        return this.httpClient
            .get<Array<any>[]>(environment.apiEndPoint + environment.commonConfig.getStates)
            .retry(environment.retryFailedRequest);
    };
}