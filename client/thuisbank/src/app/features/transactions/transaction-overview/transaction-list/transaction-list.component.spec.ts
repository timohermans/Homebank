import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TransactionListComponent} from './transaction-list.component';
import {Page} from './transaction-list.po';
import * as _ from 'lodash';
import * as moment from 'moment';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Transaction} from '../../shared/entities/transaction.model';
import {Store} from '@ngrx/store';
import { MockPipe } from 'ng-mocks';
import { ToCurrencyPipe } from 'src/app/shared/pipes/to-currency.pipe';

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;
  let store: MockStore<{transactions: Transaction[]}>;
  const initialState = {transactions: []};
  let page: Page;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionListComponent, MockPipe(ToCurrencyPipe, (value: number) => `€${value}`)],
      providers: provideMockStore({initialState}),
    }).compileComponents();

    store = TestBed.get<Store<{transactions: Transaction}>>(Store);
    fixture = TestBed.createComponent(TransactionListComponent);
    page = new Page(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls the api to retrieve data', () => {});

  describe('the table header', () => {
    let columnHeaderElements: HTMLTableHeaderCellElement[];

    beforeEach(() => {
      columnHeaderElements = page.getColumnHeaders();
    });

    const headers = ['Date', 'Payee', 'Category', 'Memo', 'Outflow', 'Inflow'];

    headers.forEach(header => {
      it(`has a ${header} column header`, () => {
        expect(
          _.find(columnHeaderElements, headerElement => headerElement.innerText === header)
        ).toBeTruthy();
      });
    });
  });

  describe('the table body', () => {
    describe('with data', () => {
      const transactions = [
        {
          id: 1,
          date: new Date(2019, 7, 1),
          category: {
            id: 1,
            name: 'Huis',
            categoryGroup: {
              id: 1,
              name: 'Verplichte kosten',
            },
          },
          inFlow: 0,
          outFlow: 65.99,
          isBankTransaction: true,
          isInflowForBudgeting: false,
          memo: 'Ziggo Z2 pakket factuure juli',
          payee: 'Ziggo B.V.',
        },
      ];

      beforeEach(() => {
        store.setState({
          transactions,
        });

        fixture.detectChanges();
      });

      transactions.forEach((transaction, rowIndex) => {
        describe(`in row ${rowIndex + 1}`, () => {
          it('displays the correct date', () => {
            expect(page.getCellValueAt(rowIndex, 0)).toBe(
              moment(transaction.date).format('YYYY-MM-DD')
            );
          });

          it('displays the correct payee', () => {
            expect(page.getCellValueAt(rowIndex, 1)).toBe(transaction.payee);
          });

          it('displays the correct category', () => {
            const expectedCategory = `${transaction.category.categoryGroup.name}: ${
              transaction.category.name
            }`;
            expect(page.getCellValueAt(rowIndex, 2)).toBe(expectedCategory);
          });

          it('displays the correct memo', () => {
            expect(page.getCellValueAt(rowIndex, 3)).toBe(transaction.memo);
          });

          it('displays the correct outflow', () => {
            expect(page.getCellValueAt(rowIndex, 4)).toBe(`€${transaction.outFlow}`);
          });

          it('displays the correct inflow', () => {
            expect(page.getCellValueAt(rowIndex, 5)).toBe(`€${transaction.inFlow}`);
          });
        });
      });
    });
  });
});
