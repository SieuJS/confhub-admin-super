import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenceTableComponent } from "../components/conference-table.component";

@Component({
  selector: 'app-conference-page',
  imports: [CommonModule, ConferenceTableComponent],
  template: `<p>conference-page works!</p>
      <app-conference-table/>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConferencePageComponent {}
export default ConferencePageComponent;