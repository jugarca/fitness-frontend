import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const excludedRoutes = ['/'];

    if (req.url.includes('/assets/i18n')) {
        return next.handle(req);
      }

      if (excludedRoutes.includes(req.url)) {
        // Si la ruta está en la lista de rutas excluidas, no hagas nada y simplemente pasa la petición
        return next.handle(req);
      }

    const id = sessionStorage.getItem('id');

    if (!id) {
      this.router.navigate(['/']);
      return EMPTY;
    }

    return next.handle(req);
  }
}