export interface UserProfile {
  id: string;
  user_id: string;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  goal: 'lose_weight' | 'gain_weight' | 'maintain' | 'build_muscle';
  activity_level: 'sedentary' | 'light' | 'moderate' | 'very_active' | 'extra_active';
  dietary_restrictions?: string[];
}