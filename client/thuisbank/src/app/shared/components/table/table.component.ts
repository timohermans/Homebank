import {Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {TableColumnComponent} from './table-column/table-column.component';
import {get, slice} from 'lodash';
import {ColumnType, TableActionType, TableData, TableRequest} from './table.model';
import * as moment from 'moment';
import {toCurrency} from '../../pipes/to-currency.pipe';
import {TableActionComponent} from './table-action/table-action.component';

@Component({
  selector: 'app-table',
  template: `
      <table class="table">
          <thead>
          <tr>
              <th *ngFor="let column of columns">
                  {{column.labelTranslationKey | translate}}
              </th>
              <th *ngIf="!(actions | isEmpty)"></th>
          </tr>
          </thead>
          <tbody class="table__rows">
          <tr class="table__row" *ngFor="let item of items | map:getItemsOnPage: areItemsAsync: page: pageSize">
              <td *ngFor="let column of columns">
                  {{item | map:getValueFrom:column | map:format:column.columnType}}
              </td>
              <td class="table_actions" *ngIf="!(actions | isEmpty)">
                  <button class="btn btn-link" *ngFor="let action of actions"
                          (click)="handleActionClick(action, item)">
                      <fa-icon [icon]="action.actionType | map: toIcon"></fa-icon>
                  </button>
              </td>
          </tr>
          </tbody>
      </table>
      <ngb-pagination (pageChange)="handlePageChange($event, pageSize)" [page]="page" [pageSize]="pageSize" [collectionSize]="totalSize"
                      [ellipses]="true" [maxSize]="10"></ngb-pagination>
  `,
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ContentChildren(TableColumnComponent) columns: QueryList<TableColumnComponent>;
  @ContentChildren(TableActionComponent) actions: QueryList<TableActionComponent>;
  public columnConfigs: TableColumnComponent[];

  @Output() requestItems = new EventEmitter<TableRequest>();

  @Input() set data(data: any[] | TableData) {
    this.setTableWith(data);
  }

  public areItemsAsync = false;
  public items: any[] = [];
  public page = 1;
  public pageSize = 10;
  public totalSize = 0;

  constructor() {
  }

  ngOnInit(): void {

  }

  private setTableWith(data: any[] | TableData): void {
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
    } else if (Array.isArray(data)) {
      this.items = data as any[];
      this.totalSize = this.items.length;
    } else {
      throw new Error('either supply a list of objects or a TableData interface instance');
    }
  }

  public getValueFrom(item: any, column: TableColumnComponent): any {
    return get(item, column.property);
  }

  public format(value: any, columnType: ColumnType): string {
    switch (columnType) {
      case ColumnType.Date:
        return moment(value).format('YYYY-MM-DD');
      case ColumnType.Money:
        return toCurrency(value);
      case ColumnType.String:
      default:
        return value;
    }
  }

  public getItemsOnPage(items: any[], areItemsAsync: boolean, page: number, pageSize: number): any[] {
    if (areItemsAsync) {
      return items;
    } else {
      return slice(items, (page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    }
  }

  public handlePageChange(page: number, pageSize: number): void {
    this.page = page;

    if (this.areItemsAsync) {
      this.requestItems.emit({
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
