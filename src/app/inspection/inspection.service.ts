import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/retry';

@Injectable()
export class InspectionService {
    constructor(private httpClient: HttpClient) { }

    searchStudentByRegistrationNumber(registrationNumber: string): Observable<any> {
        return this.httpClient
            .get<any>(environment.apiEndPoint + environment.inspectionConfig.searchStudentByRegistrationNumber, { params: new HttpParams().set('registrationNumber', registrationNumber) })
            .retry(environment.retryFailedRequest);
    };
}