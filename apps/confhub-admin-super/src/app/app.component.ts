import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./components/header.component";
@Component({
  imports: [ RouterModule, HeaderComponent],
  selector: 'app-root',
  template : `
    <app-header/>
    <div class="my-4 mx-auto container">

      <router-outlet></router-outlet>
    </div>
  `,
  styles : ``
})
export class AppComponent {
  title = 'confhub-admin-super';
}
