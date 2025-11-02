import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProfilePatientPageRoutingModule } from './profile-patient-routing.module';
import { ProfilePatientPage } from './profile-patient.page';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ProfilePatientPageRoutingModule
  ],
  declarations: [ProfilePatientPage]
})
export class ProfilePatientPageModule {}
