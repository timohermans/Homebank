export abstract class BaseTableColumn {

}
export enum ColumnType {
  String = 'string',
  Money = 'money',
  Date = 'date'
}

export interface ColumnConfig {
  type: ColumnType;
  property: string;
}

export interface TableData {
  items: any[];
  meta: {
    isAsync: boolean;
    totalSize: number;
    pageSize?: number;
    page?: number;
  };
}

export interface TableRequest {
  page: number;
  pageSize: number;
}

export enum TableActionType {
  Delete = 'delete',
  Edit = 'edit'
}

export interface TableActionEvent {
  item: any;
  actionType: TableActionType;
}
