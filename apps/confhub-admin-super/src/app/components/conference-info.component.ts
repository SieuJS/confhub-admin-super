import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  TrackByFunction,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenceService } from '../services/conference.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, of, shareReplay } from 'rxjs';
import { defaultPerPageOptions } from '../constants';
import { ConferenceResponseItem } from '../models/response/conference.response';
import { BrnTableModule, useBrnColumnManager } from '@spartan-ng/brain/table';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import {
  HlmCheckboxComponent,
  HlmCheckboxModule,
} from '@spartan-ng/ui-checkbox-helm';
import { BrnSelectModule } from '@spartan-ng/brain/select';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { lucideEllipsis } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmButtonDirective, HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmTooltipComponent, HlmTooltipTriggerDirective } from '@spartan-ng/ui-tooltip-helm';
import { BrnTooltipContentDirective } from '@spartan-ng/brain/tooltip';

@Component({
  selector: 'app-conference-info',
  standalone: true,
  imports: [
    CommonModule,

    HlmButtonModule,

    BrnTableModule,
    HlmTableModule,

    BrnMenuTriggerDirective,
    HlmMenuModule,
    BrnSelectModule,
    HlmSelectModule,

    HlmCheckboxComponent,
    HlmCheckboxModule,

    BrnSelectModule,
    HlmSelectModule,

    HlmIconDirective,
    NgIcon,

    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
    HlmButtonDirective,
    HlmIconDirective,
  ],
  providers : [provideIcons({lucideEllipsis,})],
  template: `
    @if(this.conference() !== undefined){
    <brn-table
      hlm
      stickyHeader
      class="border-border mt-4 block h-[335px] overflow-auto rounded-md border"
      [dataSource]="conference() || []"
      [displayedColumns]="allDisplayedColumns()"
      [trackBy]="trackBy"
    >
      <brn-column-def name="select" class="w-12">
        <hlm-th *brnHeaderDef>
          <hlm-checkbox />
        </hlm-th>
        <hlm-td *brnCellDef="let item">
          <hlm-checkbox />
        </hlm-td>
      </brn-column-def>
      <brn-column-def name="id" class="w-32">
        <hlm-th *brnHeaderDef>Id</hlm-th>
        <hlm-td *brnCellDef="let item">
          <p
            class="text-sm text-muted-foreground text-ellipsis overflow-hidden whitespace-nowrap"
          >
            {{ item.id }}
          </p>
        </hlm-td>
      </brn-column-def>
      <brn-column-def name="title" class="w-48 overflow-hidden">
        <hlm-th *brnHeaderDef>Title</hlm-th>
        <hlm-td *brnCellDef="let item">
          <hlm-tooltip>
          <p hlmTooltipTrigger class="text-ellipsis overflow-hidden whitespace-nowrap">
            {{ item.title }}
          </p>
          <span *brnTooltipContent >
            <p class="text-sm text-muted-foreground">
              {{ item.title }}
            </p>
          </span>
        </hlm-tooltip>
        </hlm-td>
      </brn-column-def>
      <brn-column-def name="acronym" class="w-24">
        <hlm-th *brnHeaderDef>Acronym</hlm-th>
        <hlm-td *brnCellDef="let item">{{ item.acronym }}</hlm-td>
      </brn-column-def>

      <brn-column-def name="sources" class="w-24">
        <hlm-th *brnHeaderDef>Sources</hlm-th>
        <hlm-td *brnCellDef="let item">
          <p class="text-sm text-muted-foreground">
            {{ item.sources.join(', ') }}
          </p>
        </hlm-td>
      </brn-column-def>
      <brn-column-def name="ranks" class="w-24">
        <hlm-th *brnHeaderDef>Ranks</hlm-th>
        <hlm-td *brnCellDef="let item">
          <p class="text-sm text-muted-foreground">
            {{ item.ranks.join(', ') }}
          </p>
        </hlm-td>
      </brn-column-def>
      <brn-column-def name="researchFields" class="w-24">
        <hlm-th *brnHeaderDef>Research Fields</hlm-th>
        <hlm-td *brnCellDef="let item">
          <hlm-tooltip>
          <p hlmTooltipTrigger class="text-sm text-muted-foreground text-ellipsis overflow-hidden whitespace-nowrap">
            {{ item.researchFields.join(', ') }}
          </p>
          <span *brnTooltipContent>
            <p class="text-sm text-muted-foreground">
              {{ item.researchFields.join(', ') }}
            </p>
          </span>
          </hlm-tooltip>
        </hlm-td>
      </brn-column-def>
      <brn-column-def name="status" class="w-24">
        <hlm-th *brnHeaderDef>Status</hlm-th>
        <hlm-td *brnCellDef="let item">
          <p class="text-sm text-muted-foreground">
            {{ item.status }}
          </p>
        </hlm-td>
      </brn-column-def>

      <brn-column-def name="actions" class="w-16">
        <hlm-th *brnHeaderDef></hlm-th>
        <hlm-td *brnCellDef="let element">
          <button
            hlmBtn
            variant="ghost"
            class="h-6 w-6 p-0.5"
            align="end"
            [brnMenuTriggerFor]="menu"
          >
            <ng-icon hlm size="sm" name="lucideEllipsis" />
          </button>
          <ng-template #menu>
            <hlm-menu>
              <hlm-menu-label>Actions</hlm-menu-label>
              <hlm-menu-separator />
              <hlm-menu-group>
                <button hlmMenuItem>Copy payment ID</button>
              </hlm-menu-group>
              <hlm-menu-separator />
              <hlm-menu-group>
                <button hlmMenuItem>View customer</button>
                <button hlmMenuItem>View payment details</button>
              </hlm-menu-group>
            </hlm-menu>
          </ng-template>
        </hlm-td>
      </brn-column-def>
    </brn-table>
    } @else {
    <div class="flex h-full items-center justify-center">
      <p class="text-slate-500 dark:text-slate-400">Loading...</p>
    </div>
    }
  `,
  styles: `
    @reference '../../styles.scss'
    :host {
      @apply block container mx-64
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConferenceInfoComponent {
  conferenceService = inject(ConferenceService);

  conference$ = this.conferenceService
    .getConference(undefined)
    .pipe(shareReplay(2));

  conference = toSignal(
    this.conference$.pipe(map((response) => response.data))
  );

  protected readonly brnColumnManager = useBrnColumnManager({
    id: {
      visible: true,
      label: 'ID',
    },
    title: {
      visible: true,
      label: 'Title',
    },
    acronym: {
      visible: true,
      label: 'Acronym',
    },
    sources: {
      visible: true,
      label: 'Sources',
    },
    ranks: {
      visible: true,
      label: 'Ranks',
    },
    researchFields: {
      visible: true,
      label: 'Research Fields',
    },
    status: {
      visible: true,
      label: 'Status',
    },

  });

  protected readonly allDisplayedColumns = computed(() => [
    'select',
    ...this.brnColumnManager.displayedColumns(),
    'actions',
  ]);

  conferenceMeta = toSignal(
    this.conference$.pipe(map((response) => response.meta))
  );

  protected readonly trackBy: TrackByFunction<ConferenceResponseItem> = (
    index,
    item
  ) => {
    return item.id;
  };
}
