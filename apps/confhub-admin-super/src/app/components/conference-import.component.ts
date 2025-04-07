import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  TrackByFunction,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenceService } from '../services/conference.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  combineLatest,
  debounceTime,
  filter,
  map,
  of,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { defaultPerPageOptions } from '../constants';
import {
  ConferenceResponse,
  ConferenceResponseItem,
} from '../models/response/conference.response';
import { BrnTableModule, useBrnColumnManager } from '@spartan-ng/brain/table';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import {
  HlmCheckboxComponent,
  HlmCheckboxModule,
} from '@spartan-ng/ui-checkbox-helm';
import { BrnSelectImports, BrnSelectModule } from '@spartan-ng/brain/select';
import { HlmSelectImports, HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import {
  lucideChevronDown,
  lucideChevronUp,
  lucideEllipsis,
} from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import {
  HlmButtonDirective,
  HlmButtonModule,
} from '@spartan-ng/ui-button-helm';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@spartan-ng/ui-tooltip-helm';
import { BrnTooltipContentDirective } from '@spartan-ng/brain/tooltip';
import { SelectionModel } from '@angular/cdk/collections';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { FormsModule } from '@angular/forms';
import { ConferenceRequest } from '../models/request/conference.request';

@Component({
  selector: 'app-conference-import',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    HlmButtonModule,

    BrnTableModule,
    HlmTableModule,

    BrnMenuTriggerDirective,
    HlmMenuModule,
    HlmSelectModule,

    HlmCheckboxComponent,
    HlmCheckboxModule,

    HlmIconDirective,
    NgIcon,

    HlmInputDirective,

    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
    HlmButtonDirective,
    HlmIconDirective,

    BrnSelectImports,
    HlmSelectImports,
  ],
  providers: [
    provideIcons({ lucideEllipsis, lucideChevronUp, lucideChevronDown }),
  ],
  template: `
    @if (this.conference() !== undefined) {
      <div class="flex flex-col justify-between gap-4 sm:flex-row">
        <input
          hlmInput
          class="w-full md:w-80"
          placeholder="Filter acronym, title..."
          [ngModel]="search()"
          (ngModelChange)="rawFilterInput.set($event)"
        />
        <brn-select
          class="inline-block"
          multiple="true"
          placeholder="Choose source"
          [(ngModel)]="sourceSelection"
          (ngModelChange)="toggleSourceSelection($event)"
        >
          <hlm-select-trigger class="w-56">
            <hlm-select-value />
          </hlm-select-trigger>
          <hlm-select-content>
            @for (source of sources; track source) {
              <hlm-option [value]="source" class="flex items-center gap-2">
                {{ source }}
              </hlm-option>
            }
          </hlm-select-content>
        </brn-select>
      </div>

      <brn-table
        hlm
        stickyHeader
        class="border-border mt-4 block h-128 overflow-auto rounded-md border"
        [dataSource]="conference() || []"
        [displayedColumns]="allDisplayedColumns()"
        [trackBy]="trackBy"
      >
        <brn-column-def name="select" class="w-12">
          <hlm-th *brnHeaderDef>
            <hlm-checkbox
              [checked]="checkboxState()"
              (changed)="handleHeaderCheckboxChange()"
            />
          </hlm-th>
          <hlm-td *brnCellDef="let item">
            <hlm-checkbox
              [checked]="isConferenceSelected(item)"
              (changed)="toggleConference(item)"
            />
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
        <brn-column-def name="title" class="w-48 overflow-hidden lg:flex-1/2">
          <hlm-th *brnHeaderDef>Title</hlm-th>
          <hlm-td *brnCellDef="let item">
            <hlm-tooltip>
              <p
                hlmTooltipTrigger
                class="text-ellipsis overflow-hidden whitespace-nowrap"
              >
                {{ item.title }}
              </p>
              <span *brnTooltipContent>
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
        <brn-column-def name="researchFields" class="w-24 lg:flex-1/2">
          <hlm-th *brnHeaderDef>Research Fields</hlm-th>
          <hlm-td *brnCellDef="let item">
            <hlm-tooltip>
              <p
                hlmTooltipTrigger
                class="text-sm text-muted-foreground text-ellipsis overflow-hidden whitespace-nowrap"
              >
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
    <div class="flex flex-col justify-between mt-4 sm:flex-row sm:items-center">
      <span class="text-sm text-muted-foreground"
        >{{ selected().length }} of {{ conferenceMeta()?.total }} row(s)
        selected</span
      >
      <div class="flex mt-2 sm:mt-0">
        <brn-select
          class="inline-block"
          placeholder="{{ availablePageSizes[0] }}"
          [(ngModel)]="perPage"
        >
          <hlm-select-trigger class="inline-flex mr-1 w-20 h-9">
            <hlm-select-value />
          </hlm-select-trigger>
          <hlm-select-content>
            @for (size of availablePageSizes; track size) {
              <hlm-option [value]="size">
                {{ size === 10000 ? 'All' : size }}
              </hlm-option>
            }
          </hlm-select-content>
        </brn-select>

        <div class="flex space-x-1">
          <button
            size="sm"
            variant="outline"
            hlmBtn
            [disabled]="!conferenceMeta()?.prev"
            (click)="decrement()"
          >
            Previous
          </button>
          <button
            size="sm"
            variant="outline"
            hlmBtn
            [disabled]="!conferenceMeta()?.next"
            (click)="increment()"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    @reference '../../styles.scss'
    :host {
      @apply block container;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConferenceImportComponent {
  conferenceService = inject(ConferenceService);
  sources = ['CORE2023', 'CORE2020'];
  // filter
  conferenceInput = input<ConferenceResponseItem[]>();
  search = signal('');
  rawFilterInput = signal('');
  debouncedFilterInput$ = toObservable(this.rawFilterInput).pipe(
    startWith(''),
    debounceTime(500),
  );
  perPage = signal<number>(defaultPerPageOptions[0]);
  page = signal<number>(1);
  increment = () => this.page.update((page) => page + 1);
  decrement = () => this.page.update((page) => page - 1);

  // source of truth
  sourceSelection = signal<string[]>([]);
  toggleSourceSelection = (newSortSelects: string[]) => {
    const newSource = newSortSelects.pop();
    this.sourceSelection.update((sources) => {
      if (newSource === undefined) {
        return sources;
      }
      if (sources.includes(newSource)) {
        return sources.filter((source) => source !== newSource);
      } else {
        return [...sources, newSource];
      }
    });
  };

  conference$ = combineLatest([
    this.debouncedFilterInput$,
    toObservable(this.perPage),
    toObservable(this.page),
    toObservable(this.sourceSelection),
    toObservable(this.conferenceInput),
  ]).pipe(
    filter(([filterInput, perPage, page]) => filterInput !== undefined),
    switchMap(([filterInput, perPage, page, sources, conferences]) => {
      const params: ConferenceRequest = {
        page: page,
        perPage: perPage,
        search: filterInput,
        source: sources,
      };
      return of(filterBySearch(params, conferences));
    }),
    shareReplay(1),
  );

  conference = toSignal(
    this.conference$.pipe(map((response) => response.data)),
    { initialValue: [] },
  );

  // selection model
  readonly selectionModel = new SelectionModel<ConferenceResponseItem>(true);
  protected isConferenceSelected = (conference: ConferenceResponseItem) =>
    this.selectionModel.isSelected(conference);
  protected selected = toSignal(
    this.selectionModel.changed.pipe(map((change) => change.source.selected)),
    { initialValue: [] },
  );

  protected readonly allConferencesSelected = computed(() => {
    return (
      this.conference().length > 0 &&
      this.selected().length === this.conference().length
    );
  });

  protected readonly availablePageSizes = defaultPerPageOptions;

  protected readonly checkboxState = computed(() => {
    const noneSelected = this.selected().length === 0;
    const allSelectedOrIndeterminate = this.allConferencesSelected()
      ? true
      : 'indeterminate';
    return noneSelected ? false : allSelectedOrIndeterminate;
  });

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
    this.conference$.pipe(map((response) => response.meta)),
  );

  protected readonly trackBy: TrackByFunction<ConferenceResponseItem> = (
    index,
    item,
  ) => {
    return item.id;
  };

  protected toggleConference(conference: ConferenceResponseItem) {
    this.selectionModel.toggle(conference);
  }

  protected handleHeaderCheckboxChange() {
    const previousCbState = this.checkboxState();
    if (previousCbState === 'indeterminate' || !previousCbState) {
      this.selectionModel.select(...this.conference());
    } else {
      this.selectionModel.deselect(...this.conference());
    }
  }
}

const filterBySearch = (
  params: ConferenceRequest,
  conferences: ConferenceResponseItem[] | undefined,
): ConferenceResponse => {
  const { page, perPage, search, source } = params;
  if (!page) {
    params.page = 1;
  }
  if (!perPage) {
    params.perPage = 5;
  }
  if (!conferences) {
    return {
      data: [],
      meta: {
        total: 0,
        lastPage: 0,
        currentPage: page || 1,
        perPage: perPage || 5,
        prev: null,
        next: null,
      },
    };
  }
  const filteredConferences = conferences.filter((conference) => {
    const { acronym, title } = conference;
    return (
      (acronym &&
        acronym.toLowerCase().includes(search?.toLowerCase() || '')) ||
      (title && title.toLowerCase().includes(search?.toLowerCase() || ''))
    );
  });
  console.log(filteredConferences);
  const startIndex = ((page || 1) - 1) * (perPage || 1);
  const endIndex = startIndex + (perPage || 5);

  const paginatedConferences = filteredConferences.slice(startIndex, endIndex);
  return {
    data: paginatedConferences,
    meta: {
      total: filteredConferences.length,
      lastPage: Math.ceil(filteredConferences.length / (perPage || 1)),
      currentPage: page || 1,
      perPage: perPage || 5,
      prev: page && page > 1 ? page - 1 : null,
      next:
        page && page < Math.ceil(filteredConferences.length / (perPage || 1))
          ? page + 1
          : null,
    },
  };
};
