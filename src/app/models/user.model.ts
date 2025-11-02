export interface User {
  uid: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  role?: 'patient' | 'psychologist' | null;
}
