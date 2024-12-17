import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const ACCESS_TOKEN = localStorage.getItem('access_token');

        let modifiedRequest = request;

        if (ACCESS_TOKEN) {
            modifiedRequest = request.clone({
                setHeaders: {
                    // biome-ignore lint/style/useNamingConvention: <explanation>
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
            });
        }

        return next.handle(modifiedRequest);
    }
}
