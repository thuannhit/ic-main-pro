import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { catchError, mapTo, tap } from 'rxjs/operators'
import { throwError, BehaviorSubject, of, Observable } from 'rxjs'
import { environment } from '../../../../../environments/environment'
const MIDDLE_URL = 'cash-management'

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    constructor(
        private http: HttpClient,
    ) { }

    getAvailablePublishedICProduct(): Observable<any> {
        const params = new HttpParams()
        return this.http.get<any>(`${environment.apiUrl}/ic-product/publish`, { params })
            .pipe(
                tap((oRs: any) => oRs),
                catchError(error => {
                    return of(error)
                })
            )
    }
}
