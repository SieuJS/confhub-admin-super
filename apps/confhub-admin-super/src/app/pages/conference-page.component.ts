import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenceTableComponent } from "../components/conference-table.component";
import { ConferenceInfoComponent } from "../components/conference-info.component";

@Component({
  selector: 'app-conference-page',
  imports: [CommonModule, ConferenceTableComponent, ConferenceInfoComponent],
  template: `<p>conference-page works!</p>
      <app-conference-table/>
      <app-conference-info/>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConferencePageComponent {}
export default ConferencePageComponent;