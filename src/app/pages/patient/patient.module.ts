import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Import des modules de pages du patient
import { DashboardPatientPageRoutingModule } from './dashboard-patient/dashboard-patient.module';
import { BookAppointmentPageModule } from './book-appointment/book-appointment.module';
import { MyAppointmentsPageModule } from './my-appointments/my-appointments.module';
import { ProfilePatientPageModule } from './profile-patient/profile-patient.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DashboardPatientPageRoutingModule,
    BookAppointmentPageModule,
    MyAppointmentsPageModule,
    ProfilePatientPageModule
  ],
  declarations: [],
})
export class PatientModule {}
