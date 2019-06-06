import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoaderService } from '../loader/service/loader.service';
import { map, catchError, finalize } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];

    constructor(private loaderService: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken: string = localStorage.getItem('authToken');

        if (authToken) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + authToken) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        this.requests.push(request);

        this.loaderService.isLoading.next(true);

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.removeRequest(request);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                this.removeRequest(request);
                return throwError(error);
            }));
    }

    private removeRequest(req: HttpRequest<any>) {
        const index = this.requests.indexOf(req);
        if (index >= 0) {
            this.requests.splice(index, 1);
        }

        this.loaderService.isLoading.next(this.requests.length > 0);
    }
}
