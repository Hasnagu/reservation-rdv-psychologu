import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { BookAppointmentPage } from './book-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: BookAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookAppointmentPageRoutingModule {}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BookAppointmentPageRoutingModule
  ],
  declarations: [BookAppointmentPage]
})
export class BookAppointmentPageModule {}
