import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const expectedRole = route.data['expectedRole'] as 'patient' | 'psychologist';
    const currentUser = this.authService.getCurrentUser();
    const userRole = this.authService.getUserRole();

    if (!currentUser) {
      return this.router.parseUrl('/login');
    }

    if (userRole === expectedRole) {
      return true;
    }

    if (userRole === 'patient') {
      return this.router.parseUrl('/patient/dashboard');
    } else if (userRole === 'psychologist') {
      return this.router.parseUrl('/psychologist/dashboard');
    }

    return this.router.parseUrl('/');
  }
}
