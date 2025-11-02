import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePatientPage } from './profile-patient.page';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { RoleGuard } from '../../../core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfilePatientPage,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'patient' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePatientPageRoutingModule {}
