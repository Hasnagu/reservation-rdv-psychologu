import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../models/user.model';
import firebase from 'firebase/compat/app';
import { doc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-profile-patient',
  templateUrl: './profile-patient.page.html',
  styleUrls: ['./profile-patient.page.scss'],
})
export class ProfilePatientPage {
  user: User | null = null;

  constructor(private authService: AuthService) {
    const firebaseUser = this.authService.getCurrentUser();
    this.user = firebaseUser
      ? {
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? '',
          displayName: firebaseUser.displayName ?? '',
          phoneNumber: firebaseUser.phoneNumber ?? '',
          // add other properties as needed
        }
      : null;
  }

  // Exemple : fonction pour mettre à jour le profil
  async updateProfile(displayName: string, phoneNumber: string) {
    const firebaseUser = firebase.auth().currentUser as firebase.User | null;
    if (!firebaseUser) return;

    try {
      // Mettre à jour Firebase Auth
      await firebaseUser.updateProfile({ displayName });
      await firebaseUser.updateProfile({ displayName });
      // Mettre à jour Firestore
      const userRef = doc(this.authService['firestore'], `users/${firebaseUser.uid}`);
      await updateDoc(userRef, { displayName, phoneNumber });

      alert('Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil', error);
    }
  }
}
