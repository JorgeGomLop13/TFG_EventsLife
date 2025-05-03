import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/homepage.component').then((m) => m.HomepageComponent) /*,canActivate: [AuthGuard]*/
  },
  { path: 'home', loadComponent: () => import('./components/home/homepage.component').then((m) => m.HomepageComponent) },
  { path: 'register', loadComponent: () => import('./components/register/register.component').then((m) => m.RegisterComponent) },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent) },
  {
    path: 'profile',
    loadComponent: () => import('./components/profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'createEvent',
    loadComponent: () => import('./components/create-event/create-event.component').then((m) => m.CreateEventComponent)
  },
  { path: '**', loadComponent: () => import('./components/not-found/not-found.component').then((m) => m.NotFoundComponent) }
];
