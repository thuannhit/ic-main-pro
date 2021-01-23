import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, of, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
const MIDDLE_URL = 'system-config'
@Injectable({
    providedIn: 'root'
})
export class SystemConfigService {
    constructor(
        private http: HttpClient,
    ) { }

    getCompaniesList(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/${MIDDLE_URL}/company`)
            .pipe(
                tap((oRs: any) => oRs),
                catchError(error => {
                    console.log('ERRRROROORRR', error)
                    return of(error);
                })
            );
    }

    createNewCompany(data): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/${MIDDLE_URL}/company`, data)
            .pipe(
                tap((oRs: any) => oRs),
                catchError(error => {
                    return of(error);
                })
            );
    }

    getICProductList(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/${MIDDLE_URL}/ic-product`)
            .pipe(
                tap((oRs: any) => oRs),
                catchError(error => {
                    return of(error);
                })
            );
    }

    createNewICProduct(data): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/${MIDDLE_URL}/ic-product`, data)
            .pipe(
                tap((oRs: any) => oRs),
                catchError(error => {
                    return of(error);
                })
            );
    }


}
