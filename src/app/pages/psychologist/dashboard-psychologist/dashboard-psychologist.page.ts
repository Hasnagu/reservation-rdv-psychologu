import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-psychologist',
  templateUrl: './dashboard-psychologist.page.html',
  styleUrls: ['./dashboard-psychologist.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DashboardPsychologistPage {
  private authService = inject(AuthService);

  user: any;

  constructor() {
    this.user = this.authService.getCurrentUser();
  }

  async logout() {
    await this.authService.logout();
  }
}
