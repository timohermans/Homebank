import {ComponentFixture} from '@angular/core/testing';
import {TransactionListComponent} from './transaction-list.component';

export class Page {
  public getColumnHeaders(): HTMLTableHeaderCellElement[] {
    return this.fixture.nativeElement.querySelectorAll('th') as HTMLTableHeaderCellElement[];
  }

  public getCellValueAt(rowIndex: number, columnIndex: number): string {
    const selector = `.table__rows .table__row:nth-child(${rowIndex + 1}) .table__column:nth-child(${columnIndex + 1})`;
    return (this.fixture.nativeElement.querySelector(selector) as HTMLTableDataCellElement)
      .innerText;
  }

  constructor(private fixture: ComponentFixture<TransactionListComponent>) {}
}
