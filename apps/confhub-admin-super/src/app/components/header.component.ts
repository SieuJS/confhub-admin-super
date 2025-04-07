import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { ThemeService } from '../services/theme.service';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';

import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
  HlmSubMenuComponent,
} from '@spartan-ng/ui-menu-helm';
@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    HlmSwitchComponent,

    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmAvatarImageDirective,

    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuShortcutComponent,
    BrnMenuTriggerDirective,
  ],
  template: `
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-black dark:text-white">ConfHub</h1>
      </div>
      <button [brnMenuTriggerFor]="menu" class="hover:cursor-pointer">
        <hlm-avatar>
          <img
            src="https://avatars.githubusercontent.com/u/12345678?v=4"
            alt="User Avatar"
            class="w-10 h-10 rounded-full"
            hlmAvatarImage
          />
          <span class="text-gray-500" hlmAvatarFallback>U</span>
        </hlm-avatar>
      </button>

      <ng-template #menu>
        <hlm-menu>
          <hlm-menu-label>My Account</hlm-menu-label>
          <hlm-menu-separator />
          <hlm-menu-group>
            <button hlmMenuItem>
              Profile
              <hlm-menu-shortcut>⇧⌘P</hlm-menu-shortcut>
            </button>

            <hlm-menu-separator />
            <button hlmMenuItem>
              Dark
              <hlm-menu-shortcut>
                <hlm-switch
                  (checkedChange)="onChangeTheme()"
                  [checked]="isChecked()"
                />
              </hlm-menu-shortcut>
            </button>
          </hlm-menu-group>
        </hlm-menu>
      </ng-template>
    </div>
  `,
  styles: `
    @reference "../../index.css";
    :host {
      @apply block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  onChangeTheme() {
    this.themeService.toggleDarkMode();
  }
  currentTheme = toSignal(this.themeService.theme$.pipe());

  isChecked = computed(() => this.currentTheme() === 'dark');
}
