import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { ThemeService } from '../services/theme.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, of, switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-header',
  imports: [CommonModule, HlmSwitchComponent],
  template: `
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-2xl font-bold text-white dark:text-black">ConfHub</h1>
    </div>
      <hlm-switch (checkedChange)="onChangeTheme()" [checked]="isChecked()"/>
  </div>
  `,
  styles: `
    @reference "../../index.css";
    :host {
      @apply block bg-slate-900 dark:bg-slate-50 
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  themeService = inject(ThemeService); 
  onChangeTheme() {
    this.themeService.toggleDarkMode();
  }
  currentTheme = toSignal(this.themeService.theme$.pipe())

  isChecked = computed(() => this.currentTheme() === 'dark');
}
