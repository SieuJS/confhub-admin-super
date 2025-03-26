import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { ThemeService } from '../services/theme.service';
@Component({
  selector: 'app-header',
  imports: [CommonModule, HlmSwitchComponent],
  template: `
  <hlm-switch (changed)="onChangeTheme()" />
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
}
