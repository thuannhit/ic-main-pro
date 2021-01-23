import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, of, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
const MIDDLE_URL = 'ic-product'
@Injectable({
    providedIn: 'root'
})
export class ICProductsService {
    constructor(
        private http: HttpClient,
    ) { }

    getICProductList(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/${MIDDLE_URL}`)
            .pipe(
                tap((oRs: any) => oRs),
                catchError(error => {
                    return of(error);
                })
            );
    }

    createNewICProduct(data): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/${MIDDLE_URL}`, data)
            .pipe(
                tap((oRs: any) => oRs),
                catchError(error => {
                    return of(error);
                })
            );
    }

    publishICProduct(data): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/${MIDDLE_URL}/publish`, data)
            .pipe(
                tap((oRs: any) => oRs),
                catchError(error => {
                    return of(error);
                })
            );
    }


}
