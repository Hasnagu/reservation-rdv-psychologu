  import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, DocumentData } from '@angular/fire/firestore';
import { Router } from '@angular/router';

export interface User {
  uid: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  role?: 'patient' | 'psychologist';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);

  private currentUser: FirebaseUser | null = null;
  private currentUserRole: 'patient' | 'psychologist' | null = null;

  constructor() {
    onAuthStateChanged(this.auth, async (user) => {
      this.currentUser = user;
      if (user) await this.loadUserRole(user.uid);
      else this.currentUserRole = null;
    });
  }

  /** Inscription */
  async register(
    email: string,
    password: string,
    userData: Partial<User>,
    role: 'patient' | 'psychologist'
  ): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = credential.user.uid;

    // Firestore : on utilise ['role'] pour éviter l’erreur TS4111
    await setDoc(doc(this.firestore, 'users', uid), {
      ...userData,
      ['role']: role
    });

    this.currentUserRole = role;
  }

  /** Connexion */
  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    await this.loadUserRole(credential.user.uid);
  }

  /** Déconnexion */
  async logout(): Promise<void> {
    await signOut(this.auth);
    this.currentUser = null;
    this.currentUserRole = null;
    this.router.navigate(['/login']);
  }

  /** Utilisateur courant */
  getCurrentUser(): User | null {
    if (!this.currentUser) return null;
    return {
      uid: this.currentUser.uid,
      displayName: this.currentUser.displayName || undefined,
      email: this.currentUser.email || undefined,
      phoneNumber: this.currentUser.phoneNumber || undefined,
      role: this.currentUserRole || undefined
    };
  }

  /** Rôle utilisateur */
  getUserRole(): 'patient' | 'psychologist' | null {
    return this.currentUserRole;
  }

  /** Charge le rôle depuis Firestore */
  private async loadUserRole(uid: string): Promise<void> {
    const userDoc = await getDoc(doc(this.firestore, 'users', uid));
    const data: DocumentData | undefined = userDoc.data();
    this.currentUserRole = data?.['role'] || null; // <- utilisation correcte pour TS4111
  }
}
