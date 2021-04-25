import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, exhaustMap, take, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class AllegroAuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(take(1), exhaustMap(user => {

      if (!user || !user.tokenAllegro) {
        return next.handle(req);
      }

      const modifiedReq = req.clone({
        headers: req.headers.append('Accept', 'application/vnd.allegro.public.v1+json')
          .append('AllegroAuthorization', user.tokenAllegro)
      });

      return next.handle(modifiedReq).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            if (event.body && event.body.success) {
            }
          }
        }),
        catchError((err: any) => {
          return throwError(err);
        }));
    }));
  }
}
