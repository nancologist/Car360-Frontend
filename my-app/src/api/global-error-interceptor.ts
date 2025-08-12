import {Injectable} from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let userMessage = '';

                switch (error.status) {
                    case 400:
                        userMessage = 'Bad Request: Please check your input.';
                        break;
                    case 401:
                        userMessage = 'Unauthorized: Please login again.';
                        this.router.navigate(['/login']);
                        break;
                    case 403:
                        userMessage = 'Access denied. You do not have permission.';
                        break;
                    case 404:
                        userMessage = 'Resource not found.';
                        break;
                    case 500:
                        userMessage = 'A server error occurred. Please try again later.';
                        break;
                    case 0:
                        userMessage = 'Network error: Please check your internet connection.';
                        break;
                    default:
                        userMessage = `An unexpected error occurred: ${error.message}`;
                        break;
                }

                return throwError(() => ({
                    message: userMessage
                }));
            })
        );
    }
}
