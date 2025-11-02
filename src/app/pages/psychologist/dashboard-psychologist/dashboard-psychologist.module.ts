import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardPsychologistPageRoutingModule } from './dashboard-psychologist-routing.module';
import { DashboardPsychologistPage } from './dashboard-psychologist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // ← IonicModule est essentiel ici
    DashboardPsychologistPageRoutingModule
  ],
  declarations: [DashboardPsychologistPage]
})
export class DashboardPsychologistPageModule {}
