import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community';
@Component({
  selector: 'app-conference-table',
  imports: [CommonModule, AgGridAngular],
  template: `<p>conference-table works!</p>
    <ag-grid-angular
        [rowData]="rowData"
        [columnDefs]="colDefs" />
  `,
  styles: `
    @reference "../../index.css";
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConferenceTableComponent {
  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
];

// Column Definitions: Defines the columns to be displayed.
colDefs: ColDef[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
];
}
