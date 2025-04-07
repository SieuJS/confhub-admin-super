import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgxCsvParser, NgxCsvParserModule } from 'ngx-csv-parser';
import {
  FileUploadComponent,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { ConferenceService } from '../services/conference.service';
import { ConferenceTableComponent } from '../components/conference-table.component';
import { ConferenceImportComponent } from '../components/conference-import.component';

@Component({
  selector: 'app-conference-import-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxCsvParserModule,
    FileUploadComponent,
    ConferenceImportComponent,
  ],
  template: `
    <form
      [formGroup]="conferenceForm"
      class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
    >
      <file-upload
        class="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        formControlName="files"
        [multiple]="false"
        [animation]="true"
      >
      </file-upload>
    </form>
    <div class="mt-4">
      <app-conference-import
        [conferenceInput]="conferenceImportResponseSignal()"
      />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConferenceImportPageComponent {
  private filesControl = new FormControl<File[] | null>(
    null,
    FileUploadValidators.filesLimit(2),
  );
  private conferenceService = inject(ConferenceService);
  ngxCsvParser = inject(NgxCsvParser);
  fileRef = viewChild('importField');
  public conferenceForm = new FormGroup({
    files: this.filesControl,
  });
  conferenceImport$ = this.filesControl.valueChanges.pipe(
    filter((file) => file !== null),
    switchMap((files: File[]) => {
      return this.conferenceService.uploadFileCsv(files[0]);
    }),
    catchError((error) => {
      console.error('Error parsing CSV file:', error);
      return of(undefined);
    }),
    tap((response) => {
      console.log('Parsed CSV data:', response);
    }),
  );

  conferenceImportResponseSignal = toSignal(
    this.conferenceImport$.pipe(
      filter((response) => !!response),
      switchMap((response) => of(response.data)),
    ),
  );
}

export default ConferenceImportPageComponent;
