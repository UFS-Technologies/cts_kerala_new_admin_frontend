import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
    Router
} from '@angular/router';
import { Injectable } from '@angular/core';
// import { UtilityService } from '../providers/utilService';
// import { UserData } from '../providers/user-data';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        // public util: UtilityService,
        // public userData: UserData
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('Access_Token');
        if (token) {
            request = request.clone({
                setHeaders: {
                    'authorization': 'Bearer ' + token
                }
            });
        }

        // if (!request.headers.has('Content-Type')) {
        //     request = request.clone({
        //         setHeaders: {
        //             'content-type': 'application/json'
        //         }
        //     });
        // }

        // request = request.clone({
        //     headers: request.headers.set('Accept', 'application/json')
        // });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                  //console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    if (error.error.success === false) {
                        this.presentToast('Login failed');
                    } else {
                        this.router.navigate(['login']);
                    }
                } else if (error.status === 400) {
                    if (error.error.message === 'accesstoken_not_found') {
                        // this.userData.logout();
                        this.router.navigateByUrl('/login');
                    } else {
                        this.presentToast('error.' + error.error.message || 'error.something_went_wrong');

                    }
                } else {
                    return throwError(error);
                }
                return throwError(error);
            }),
        );
    }
    async presentToast(msg) {
        // this.util.showToast(msg);
    }

}
