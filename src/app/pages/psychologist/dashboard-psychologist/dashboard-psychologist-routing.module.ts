import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPsychologistPage } from './dashboard-psychologist.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPsychologistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPsychologistPageRoutingModule {}
