import {Component, forwardRef, OnInit} from '@angular/core';
import {TableColumnComponent} from '../table-column/table-column.component';

@Component({
  selector: 'app-table-date-column',
  template: `
      <ng-template #innerTemplate let-value>{{value | date}}</ng-template>`,
  styleUrls: ['./table-date-column.component.scss'],
  providers: [{provide: TableColumnComponent, useExisting: forwardRef(() => TableDateColumnComponent)}]
})
export class TableDateColumnComponent extends TableColumnComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
