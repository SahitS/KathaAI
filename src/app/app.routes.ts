import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'mahabharatha',
    loadComponent: () => import('./components/mahabharatha-content/mahabharatha-content.component').then(m => m.MahabharathaContentComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
