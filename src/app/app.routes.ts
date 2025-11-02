import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'patient',
    loadComponent: () => import('./pages/patient/dashboard-patient/dashboard-patient.page').then(m => m.DashboardPatientPage)
  },
  {
    path: 'psychologist',
    loadComponent: () => import('./pages/psychologist/dashboard-psychologist/dashboard-psychologist.page').then(m => m.DashboardPsychologistPage)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
