import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardPatientPageRoutingModule } from './dashboard-patient-routing.module';
import { DashboardPatientPage } from './dashboard-patient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // ← IonicModule est essentiel ici
    DashboardPatientPageRoutingModule
  ],
  declarations: [DashboardPatientPage]
})
export class DashboardPatientPageModule {}
