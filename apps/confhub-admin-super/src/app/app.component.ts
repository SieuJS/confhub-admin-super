import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./components/header.component";
@Component({
  imports: [ RouterModule, HeaderComponent],
  selector: 'app-root',
  template : `
    <app-header/>
    <router-outlet></router-outlet>
  `,
  styles : ``
})
export class AppComponent {
  title = 'confhub-admin-super';
}
