import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPatientPage } from './dashboard-patient.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPatientPageRoutingModule {}
