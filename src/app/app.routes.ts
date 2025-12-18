import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'webcam', pathMatch: 'full' },
  {
    path: 'webcam',
    loadComponent: () =>
      import('./pages/webcam/webcam-page.component').then(
        (m) => m.WebcamPageComponent
      ),
  },
  {
    path: 'classic',
    loadComponent: () =>
      import('./pages/classic/classic-captcha.component').then(
        (m) => m.ClassicCaptchaComponent
      ),
  },
];
