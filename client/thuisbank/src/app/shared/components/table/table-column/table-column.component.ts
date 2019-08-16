import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ColumnType} from '../table.model';

@Component({
  selector: 'app-table-column',
  template: `
      <ng-template #innerTemplate let-column>hello, {{column.columnType}}</ng-template>`,
  styleUrls: ['./table-column.component.scss']
})
export class TableColumnComponent implements OnInit {
  @Input() labelTranslationKey: string;
  @Input() property: string;
  @Input() columnType: ColumnType;
  @Input() classes: string[];
  public value: string;

  @ViewChild('innerTemplate', {static: false})
  public innerTemplate: TemplateRef<any>;

  constructor() {
  }

  ngOnInit() {
  }

}
