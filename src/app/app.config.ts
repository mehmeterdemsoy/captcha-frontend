import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { ClassicCaptchaComponent } from './pages/classic/classic-captcha.component';
import { WebcamPageComponent } from './pages/webcam/webcam-page.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', redirectTo: 'classic', pathMatch: 'full' },
      { path: 'classic', component: ClassicCaptchaComponent },
      { path: 'webcam', component: WebcamPageComponent }
    ])
  ]
};
