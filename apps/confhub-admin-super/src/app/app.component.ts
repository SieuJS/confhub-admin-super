import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { SideBarComponent } from './components/side-bar.component';
@Component({
  imports: [RouterModule, HeaderComponent, SideBarComponent],
  selector: 'app-root',
  template: `
    <div class="grid grid-cols-4 grid-rows-1 m-0 p-0">
      <app-side-bar class="h-screen col-span-1" />
      <div class="container col-span-3">
      <app-header class="py-4" />
      <router-outlet></router-outlet>
      </div>
       
    </div>
  `,
  styles: ``,
})
export class AppComponent {
  title = 'confhub-admin-super';
}
