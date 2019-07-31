import {ComponentFixture} from '@angular/core/testing';
import {TransactionOverviewComponent} from './transaction-overview.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

export class Page {
  public get transactionList(): DebugElement {
    return this.fixture.debugElement.query(By.css('.transaction-overview__list'));
  }

  public get actionBar(): DebugElement {
    return this.fixture.debugElement.query(By.css('.transaction-overview__actions'));
  }

  public get transactionHeader(): DebugElement {
    return this.fixture.debugElement.query(By.css('.transaction-overview__header'));
  }

  constructor(private fixture: ComponentFixture<TransactionOverviewComponent>) {}
}
