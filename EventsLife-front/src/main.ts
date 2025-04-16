import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router'; // 👈 importar esto
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // 👈 y tus rutas

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(routes)]
}).catch((err) => console.error(err));
