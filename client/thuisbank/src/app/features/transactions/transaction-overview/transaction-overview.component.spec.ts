import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionOverviewComponent } from './transaction-overview.component';
import { Page } from './transaction-overview.po';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { MockComponent } from 'ng-mocks';
import { TransactionActionBarComponent } from './transaction-action-bar/transaction-action-bar.component';
import { TransactionHeaderComponent } from './transaction-header/transaction-header.component';

describe('TransactionOverviewComponent', () => {
  let component: TransactionOverviewComponent;
  let fixture: ComponentFixture<TransactionOverviewComponent>;
  let page: Page;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TransactionOverviewComponent,
        MockComponent(TransactionListComponent),
        MockComponent(TransactionActionBarComponent),
        MockComponent(TransactionHeaderComponent)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionOverviewComponent);
    component = fixture.componentInstance;
    page = new Page(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('the list of transactions', () => {
    it('is visible', () => {
      expect(page.transactionList).toBeTruthy();
    });
  });

  describe('the transactions header', () => {
    it('is visible', () => {
      expect(page.transactionHeader).toBeTruthy();
    });
  });

  describe('the action bar', () => {
    it('is visible', () => {
      expect(page.actionBar).toBeTruthy();
    });
  });
});
