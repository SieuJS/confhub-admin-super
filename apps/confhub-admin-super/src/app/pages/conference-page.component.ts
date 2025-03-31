import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenceTableComponent } from "../components/conference-table.component";
import { ConferenceInfoComponent } from "../components/conference-info.component";

@Component({
  selector: 'app-conference-page',
  imports: [CommonModule, ConferenceTableComponent, ConferenceInfoComponent],
  template: `
      <app-conference-table class="my-8"/>
      <app-conference-info class="my-8"/>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConferencePageComponent {}
export default ConferencePageComponent;