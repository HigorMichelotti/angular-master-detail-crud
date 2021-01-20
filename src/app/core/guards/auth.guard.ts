import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private rota: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.verificarToken()) return true;

    this.rota.navigate(['login']);
    return false;
  }

}
