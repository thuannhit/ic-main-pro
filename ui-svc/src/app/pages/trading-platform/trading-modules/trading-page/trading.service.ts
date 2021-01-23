import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { catchError, mapTo, tap } from 'rxjs/operators'
import { throwError, BehaviorSubject, of, Observable } from 'rxjs'
import { ITopupWithDrawTransferedData } from './interfaces/topup-withdraw-transfered-data.interface'
import { environment } from '../../../../../environments/environment'
const MIDDLE_URL = 'cash-management'

@Injectable({
    providedIn: 'root'
})
export class ICTradingService {
    constructor(
        private http: HttpClient,
    ) { }

    getFinancialStatements(user_id: number, from_date: number, end_date: number, limit: number, offset: number): Observable<any> {
        const params = new HttpParams()
            .set('from_date', from_date.toString())
            .set('end_date', end_date.toString())
            .set('limit', limit.toString())
            .set('offset', offset.toString())
        return this.http.get<any>(`${environment.apiUrl}/${MIDDLE_URL}/financial-statements/${user_id}`, { params })
            .pipe(
                tap((oRs: any) => oRs),
                catchError(error => {
                    return of(error)
                })
            )
    }

    topup(user_id: number, params: ITopupWithDrawTransferedData): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/${MIDDLE_URL}/financial-statements/${user_id}/topup`, { ...params })
            .pipe(
                tap((oRs: any) => oRs),
                catchError(error => {
                    return of(error)
                })
            )
    }

    withdraw(user_id: number, params: ITopupWithDrawTransferedData): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/${MIDDLE_URL}/financial-statements/${user_id}/withdraw`, { ...params })
            .pipe(
                tap((oRs: any) => oRs),
                catchError(error => {
                    return of(error)
                })
            )
    }
}
