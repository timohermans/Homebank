import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList
} from '@angular/core';
import { TableColumnComponent } from './table-column/table-column.component';
import { get, slice, isNil } from 'lodash';
import { ColumnType, TableActionType, TableData, TableRequest } from './table.model';
import { TableActionComponent } from './table-action/table-action.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  @ContentChildren(TableColumnComponent) columns: QueryList<TableColumnComponent>;
  @ContentChildren(TableActionComponent) actions: QueryList<TableActionComponent>;
  @Output() dataRequest = new EventEmitter<TableRequest>();

  public readonly actionColumnWidthPercentage = 5;

  private _data: any;

  /**
   * The data for the table. This can either just be a simple list of items or a TableData object.
   *
   * When a TableData object is supplied, the meta.areItemsAsync property will determine whether or not the table is a
   * table that will emit events for requesting paginated data.
   *
   * When meta.areItemsAsync is true and no items are initially supplied, a dataRequest event will immediately
   * emit.
   */
  @Input() set data(data: any[] | TableData) {
    this._data = data;
    setTimeout(() => {
      this.setTableWith(this._data);
    });
  }

  public areItemsAsync = false;
  public items: any[] = [];
  public page = 1;
  public pageSize = 10;
  public totalSize = 0;

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateColumnWidths();
    });
  }

  private calculateColumnWidths(): void {
    if (_.isEmpty(this.columns)) {
      return;
    }

    const columnsSet = [];
    const columnsNotSet = [];

    this.columns.forEach((column: TableColumnComponent) => {
      if (column.width) {
        columnsSet.push(column);
      } else {
        columnsNotSet.push(column);
      }
    });

    if (columnsNotSet.length === 0) {
      return;
    }

    let percentageSet = +_.sumBy(columnsSet, column => +column.width);

    if (!_.isEmpty(this.actions)) {
      percentageSet += this.actionColumnWidthPercentage;
    }

    let width = 10;

    if (percentageSet < 90) {
      width = (100 - percentageSet) / columnsNotSet.length;
    }

    columnsNotSet.forEach(column => (column.width = width));
  }

  private setTableWith(data: any[] | TableData): void {
    if (data == null) {
      return;
    }

    if ('meta' in data && 'items' in data) {
      this.areItemsAsync = data.meta.isAsync;
      this.items = data.items;
      this.totalSize = data.meta.totalSize;
      if (data.meta.page) {
        this.page = data.meta.page;
      }
      if (data.meta.pageSize) {
        this.pageSize = data.meta.pageSize;
      }

      if (isNil(this.items)) {
        this.handlePageChange(this.page, this.pageSize);
      }
    } else if (Array.isArray(data)) {
      this.items = data as any[];
      this.totalSize = this.items.length;
    } else {
      throw new Error('either supply a list of objects or a TableData interface instance');
    }
  }

  public getValueFor(item: any, column: TableColumnComponent): any {
    return get(item, column.property);
  }

  public getItemsOnPage(
    items: any[],
    areItemsAsync: boolean,
    page: number,
    pageSize: number
  ): any[] {
    if (areItemsAsync) {
      return items;
    } else {
      return slice(items, (page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    }
  }

  public handlePageChange(page: number, pageSize: number): void {
    this.page = page;

    if (this.areItemsAsync) {
      this.dataRequest.emit({
        page,
        pageSize
      });
    }
  }

  public handleActionClick(action: TableActionComponent, item: any) {
    if (!action.actionClick) {
      return;
    }

    action.actionClick.emit({
      actionType: action.actionType,
      item
    });
  }

  public toIcon(actionType: TableActionType): string {
    switch (actionType) {
      case TableActionType.Delete:
        return 'trash';
      case TableActionType.Edit:
        return 'edit';
      default:
        throw new Error(`yo, missing icon for action ${actionType}`);
    }
  }
}
