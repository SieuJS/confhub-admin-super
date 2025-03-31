import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-side-bar',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex flex-col h-screen bg-gray-800 text-white">
    <div class="mb-2 flex items-center gap-4 p-4">
        <img
          src="https://www.material-tailwind.com/logos/mt-logo.png"
          alt="brand"
          class="h-9 w-9"
        />
        <p
          class="block antialiased font-sans text-base font-light leading-relaxed text-blue-gray-900 text-lg font-bold"
        >
          Material Tailwind
        </p>
      </div>
      <hr class="my-2 border-gray-200" />
      <nav
        class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700"
      >
        <div class="block relative w-full">
          <div
            data-selected="false"
            role="button"
            data-ripple-dark="true"
            tabindex="0"
            class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-gray-50 hover:bg-opacity-80 focus:bg-gray-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 outline-none p-3 select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900"
          >
            <div class="grid place-items-center mr-4">
              <img
                src="https://www.material-tailwind.com/img/avatar1.jpg"
                class="inline-block relative object-cover object-center !rounded-full w-9 h-9 rounded-md"
              />
            </div>
            <p
              class="block antialiased font-sans text-base font-light leading-relaxed text-inherit mr-auto font-normal text-inherit"
            >
              Brooklyn Alice
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
              class="ml-auto h-4 w-4 text-gray-500 transition-transform"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              ></path>
            </svg>
          </div>
          <div class="overflow-hidden" style="height: 0px">
            <div
              class="block w-full py-4 text-gray-700 antialiased font-sans text-sm font-light leading-normal py-1"
            >
              <nav
                class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700 p-0"
              >
                <div
                  role="button"
                  data-ripple-dark="true"
                  tabindex="0"
                  class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-gray-50 hover:bg-opacity-80 focus:bg-gray-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 outline-none px-16 select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900"
                >
                  My Profile
                </div>
                <div
                  role="button"
                  data-ripple-dark="true"
                  tabindex="0"
                  class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-gray-50 hover:bg-opacity-80 focus:bg-gray-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 outline-none px-16 select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900"
                >
                  Settings
                </div>
              </nav>
            </div>
          </div>
        </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent {}
