import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenceInfoComponent } from "../components/conference-info.component";
import { OptionDirective, SelectorComponent } from "../ui/selector.component";

@Component({
  selector: 'app-conference-page',
  imports: [CommonModule, ConferenceInfoComponent, SelectorComponent, OptionDirective],
  template: `
      <app-conference-info class="my-8"/>

      <div class="">
      <app-selector >
        <div appOption label="Option 1" value="1"></div>
        <div appOption label="Option 2" value="2"></div>
        <div appOption label="Option 3" value="3"></div>
      </app-selector>
      </div>

  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConferencePageComponent {}
export default ConferencePageComponent;