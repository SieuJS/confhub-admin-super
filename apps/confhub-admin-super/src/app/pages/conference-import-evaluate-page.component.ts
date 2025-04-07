import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conference-import-evaluate-page',
  imports: [CommonModule],
  template: `<p>conference-import-evaluate-page works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConferenceImportEvaluatePageComponent {}
