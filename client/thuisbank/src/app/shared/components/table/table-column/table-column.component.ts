import {Component, Input, OnInit} from '@angular/core';
import {ColumnType} from '../table.model';

@Component({
  selector: 'app-table-column',
  templateUrl: './table-column.component.html',
  styleUrls: ['./table-column.component.scss']
})
export class TableColumnComponent implements OnInit {
  @Input() labelTranslationKey: string;
  @Input() property: string;
  @Input() columnType: ColumnType;

  constructor() {
  }

  ngOnInit() {
  }

}
