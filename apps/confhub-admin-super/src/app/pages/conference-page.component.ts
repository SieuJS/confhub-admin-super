import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenceInfoComponent } from "../components/conference-info.component";

@Component({
  selector: 'app-conference-page',
  imports: [CommonModule, ConferenceInfoComponent],
  template: `
      <app-conference-info class="my-8"/>
      
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConferencePageComponent {}
export default ConferencePageComponent;