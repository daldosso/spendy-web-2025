import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Configura HttpClient
    provideRouter(routes), // Configura il router
    provideNoopAnimations(),
  ]
}).catch(err => console.error(err));
