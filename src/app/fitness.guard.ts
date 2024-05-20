import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FitnessGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const condition = true; // Cambia esto por tu propia lógica
    const variable = sessionStorage.getItem('id');

    if (!variable) {
      this.router.navigate(['/']); // Cambia '/main' por la ruta de tu pantalla principal
      return false;
    }

    return true;
  }
}