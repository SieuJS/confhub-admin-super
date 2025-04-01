import { ChangeDetectionStrategy, Component, contentChildren, Directive, inject, InjectionToken, input, Signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
export type Option<T> = {
  label: Signal<string>;
  value: Signal<T>;
}
export const OPTION = new InjectionToken<Option<unknown>>('OPTION');

@Directive({
  selector: '[appOption]',
  standalone: true,
  providers: [
    {
      provide: OPTION,
      useExisting: OptionDirective,
      multi: true
    },
  ],
})
export class OptionDirective<T> implements Option<T> {
  label = input<string>('label');
  value = input.required<T>();
}

@Component({
  selector: 'app-selector',
  imports: [CommonModule],
  template: `

  <select>
    
  </select>

  @for (item of contentChild(); track $index) {
      @if(item ) {
        <div class="flex items-center gap-2">
          <input
            type="radio"
            name="selector" 
            [value]="item.value()"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <label class="text-sm font-medium text-gray-900 dark:text-gray-300">
            {{ item.label() }}
          </label>
        </div>
      }
  }

  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorComponent {
  contentChild = contentChildren(OPTION);



}
