import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, of, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
const MIDDLE_URL = 'user'

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private http: HttpClient,
    ) { }

    getCustomersList(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/${MIDDLE_URL}/customers`)
            .pipe(
                tap((oRs: any) => oRs),
                catchError(error => {
                    return of(error);
                })
            );
    }
}
