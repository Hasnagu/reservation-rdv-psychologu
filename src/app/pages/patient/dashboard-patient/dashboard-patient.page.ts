import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-patient',
  templateUrl: './dashboard-patient.page.html',
  styleUrls: ['./dashboard-patient.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DashboardPatientPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  user: any;

  constructor() {
    this.user = this.authService.getCurrentUser();
  }

  async logout() {
    await this.authService.logout();
  }

  goToBookAppointment() {
    this.router.navigate(['/patient/book-appointment']);
  }

  goToMyAppointments() {
    this.router.navigate(['/patient/my-appointments']);
  }
}
