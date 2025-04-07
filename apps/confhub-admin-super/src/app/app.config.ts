import { ApplicationConfig, provideExperimentalZonelessChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideNgIconsConfig } from '@ng-icons/core';
export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideNgIconsConfig({})
  ],
};
