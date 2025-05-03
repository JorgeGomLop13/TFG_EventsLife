import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  //Uso este guards para las rutas que requieren autenticación
  //El guard se encarga de comprobar si el usuario esta autenticado, si no lo esta redirige a la pagina de login

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      localStorage.clear();
      return false;
    }
  }
}
