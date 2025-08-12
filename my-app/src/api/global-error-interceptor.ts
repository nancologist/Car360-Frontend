import {
    HttpErrorResponse,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest
} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export const globalErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let userMessage = '';

            switch (error.status) {
                case 400:
                    userMessage = 'Bad Request: Please check your input.';
                    break;
                case 401:
                    userMessage = 'Unauthorized: Please login again.';
                    // this.router.navigate(['/login']);
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

            return throwError(() => new Error(userMessage));
        })
    );
}
