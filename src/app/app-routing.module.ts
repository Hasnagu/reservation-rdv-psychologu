import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'dashboard-patient',
    loadComponent: () => import('./pages/patient/dashboard-patient/dashboard-patient.page').then(m => m.DashboardPatientPage)
  },
  {
    path: 'dashboard-psychologist',
    loadComponent: () => import('./pages/psychologist/dashboard-psychologist/dashboard-psychologist.page').then(m => m.DashboardPsychologistPage)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
