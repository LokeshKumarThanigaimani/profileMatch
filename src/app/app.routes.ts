import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/swipe', pathMatch: 'full' },
  { path: 'matches', loadComponent: () => import('./pages/matches/matches').then(m => m.MatchesPage) },
  { path: 'swipe', loadComponent: () => import('./pages/swipe/swipe').then(m => m.SwipePage) },
  { path: 'view-profile/:id', loadComponent: () => import('./pages/profile/profile').then(m => m.ProfilePage) }
];
