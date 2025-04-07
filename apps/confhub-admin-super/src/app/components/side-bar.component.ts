import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-side-bar',
  imports: [CommonModule, RouterLink],
  template: `
    <div
      class="relative flex flex-col bg-clip-border rounded-xl shadow-md h-[calc(100vh-2rem)] w-full max-w-[20rem] p-6 dark:bg-gray-800"
    >
      <div class="mb-2 flex items-center gap-4 p-4">
        <img
          src="https://www.material-tailwind.com/logos/mt-logo.png"
          alt="brand"
          class="h-9 w-9"
        />
        <p
          class="block antialiased font-sans text-base leading-relaxed font-bold text-gray-900 dark:text-white"
        >
          Material Tailwind
        </p>
      </div>
      <hr class="my-2 border-gray-200 dark:border-gray-700" />
      <nav
        class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700 dark:text-gray-300"
      >
        @for (item of menuItems; track $index) {
        <a
          [routerLink]="item.route"
          class=" hover:cursor-pointer flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:active:bg-gray-700 text-gray-900 dark:text-gray-300"
        >
          <div class="grid place-items-center mr-4 ">
            <img [src]="item.icon" class="inline-block w-9 h-9 rounded-md" />
          </div>
          <p
            class="block antialiased font-sans text-base leading-relaxed mr-auto font-normal"
          >
            {{ item.label }}
          </p>
        </a>
        }
      </nav>
      <hr class="my-2 border-gray-200 dark:border-gray-700" />
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent {
  menuItems = [
    {
      label: 'Dashboard',
      icon: 'https://www.material-tailwind.com/img/avatar1.jpg',
      route: '/',
    },
    {
      label: 'Conference',
      icon: 'https://www.material-tailwind.com/img/avatar2.jpg',
      route: '/conference',
    },
    {
      label: 'Profile',
      icon: 'https://www.material-tailwind.com/img/avatar3.jpg',
      router: '/profile',
    },
  ];
}
