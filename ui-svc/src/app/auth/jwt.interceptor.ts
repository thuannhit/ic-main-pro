import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';
import { catchError, filter, take, switchMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { JwtTokensDTO, UserLoginResponseDTO } from './dtos'

@Injectable()
export class JwTAuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<JwtTokensDTO> = new BehaviorSubject<JwtTokensDTO>(null);
    constructor(
        private router: Router,
        private tokenService: TokenService,
        private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): any {

        const accessToken = this.tokenService.getAccessToken();

        if (accessToken) {
            request = this.addTokenToHeader(request, accessToken)
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                setHeaders: {
                    'content-type': 'application/json'
                }
            });
        }

        request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
        });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((oError: HttpErrorResponse) => {
                if (oError.status === 401) {
                    if (oError.error.error.message === 'TokenExpiredError') {
                        return this.handleAccessTokenExpired(request, next)
                        // this.authService.refreshToken()
                        //     .subscribe(() => {
                        //         location.reload();
                        //     });
                    } else {
                        this.router.navigate(['login']).then(_ => console.log('redirect to login'));
                    }
                }
                return throwError(oError);
            }));
    }
    
    private handleAccessTokenExpired(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((loggedUser: UserLoginResponseDTO) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next({refreshToken: loggedUser.data.refreshToken, accessToken: loggedUser.data.accessToken});
                    return next.handle(this.addTokenToHeader(request, loggedUser.data.accessToken));
                }),
                catchError((oError: HttpErrorResponse) => {
                    this.router.navigate(['login']).then(_ => console.log('redirect to login'));
                    return throwError(oError)
                }));

        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(tokens => {
                    return next.handle(this.addTokenToHeader(request, tokens.accessToken));
                }));
        }
    }

    private addTokenToHeader(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}