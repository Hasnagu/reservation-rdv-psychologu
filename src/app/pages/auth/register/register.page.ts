import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, IonicModule } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  selectedRole: 'patient' | 'psychologist' = 'patient';
  isLoading = false;

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private alertController = inject(AlertController);
  private loadingController = inject(LoadingController);

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      displayName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator.bind(this)
    });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword?.setErrors(null);
    }
    return null;
  }

  // CORRECTION : Méthode setRole avec gestion des valeurs undefined
  setRole(role: any) {
    if (role === 'patient' || role === 'psychologist') {
      this.selectedRole = role;
    }
    // Si le rôle n'est pas valide, on garde la valeur actuelle
  }

  async register() {
    if (this.registerForm.valid && !this.isLoading) {
      this.isLoading = true;

      const loading = await this.loadingController.create({
        message: 'Création de votre compte...',
        spinner: 'crescent'
      });

      await loading.present();

      try {
        const { displayName, email, phoneNumber, password } = this.registerForm.value;

        const userData = {
          displayName: displayName.trim(),
          phoneNumber: phoneNumber.trim()
        };

        await this.authService.register(email, password, userData, this.selectedRole);

        await loading.dismiss();

        console.log('Inscription réussie');

      } catch (error: any) {
        await loading.dismiss();
        this.isLoading = false;
        this.showErrorAlert('Erreur d\'inscription', error);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  private markFormGroupTouched() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  private async showErrorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Getters pour un accès facile aux contrôles du formulaire
  get displayNameControl() { return this.registerForm.get('displayName'); }
  get emailControl() { return this.registerForm.get('email'); }
  get phoneNumberControl() { return this.registerForm.get('phoneNumber'); }
  get passwordControl() { return this.registerForm.get('password'); }
  get confirmPasswordControl() { return this.registerForm.get('confirmPassword'); }
}
