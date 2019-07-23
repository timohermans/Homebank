import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BudgetListComponent} from './budget-list.component';
import {By} from '@angular/platform-browser';
import {MockComponent, MockPipe} from 'ng-mocks';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

import {BudgetHeaderComponent} from '../budget-header/budget-header.component';
import {Store} from '@ngrx/store';
import {BudgetModel} from '../shared/budget.model';
import {MapPipe} from 'src/app/shared/pipes/map.pipe';
import {ToCurrencyPipe} from 'src/app/shared/pipes/to-currency.pipe';

export class Page {
  getCategoryGroupBy(name: string) {
    return this.fixture.nativeElement.querySelector(`[data-test-id="${name}"]`);
  }
  public get budgetHeader(): BudgetHeaderComponent {
    return this.fixture.debugElement.query(By.css('app-budget-header')).componentInstance;
  }

  public get categoryGroups(): HTMLDivElement[] {
    return this.fixture.nativeElement.querySelectorAll('.budget-table__row--category-group');
  }

  public getColumnBy(categoryGroupName: string, columnTestId: string): HTMLDivElement {
    return this.fixture.nativeElement.querySelector(
      `[data-test-id="${categoryGroupName}"] [data-label="${columnTestId}"]`
    );
  }

  constructor(private fixture: ComponentFixture<BudgetListComponent>) {}
}

const budgetTestData = [
  {
    id: 1,
    activity: 10,
    available: 50,
    budgeted: 50,
    categoryGroupId: 1,
    categoryGroupName: 'obligated',
    categoryId: 1,
    categoryName: 'internet',
    monthForBudget: new Date(),
  },
  {
    id: 2,
    activity: 10,
    available: 20,
    budgeted: 50,
    categoryGroupId: 1,
    categoryGroupName: 'obligated',
    categoryId: 2,
    categoryName: 'electrical bill',
    monthForBudget: new Date(),
  },
  {
    id: 3,
    activity: 12,
    available: 50,
    budgeted: 50,
    categoryGroupId: 2,
    categoryGroupName: 'variable',
    categoryId: 3,
    categoryName: 'groceries',
    monthForBudget: new Date(),
  },
];

describe('BudgetListComponent', () => {
  let component: BudgetListComponent;
  let fixture: ComponentFixture<BudgetListComponent>;
  let page: Page;

  let store: MockStore<{budgets: BudgetModel[]}>;
  const initialState = {budgets: []};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BudgetListComponent,
        MockComponent(BudgetHeaderComponent),
        MapPipe,
        MockPipe(ToCurrencyPipe, (value: number) => `€ ${value}`),
      ],
      providers: [provideMockStore({initialState})],
    }).compileComponents();

    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetListComponent);
    page = new Page(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('the budget header', () => {
    it('should be there', () => {
      expect(page.budgetHeader).toBeTruthy();
    });
  });

  describe('with budget data', () => {
    beforeEach(() => {
      store.setState({
        budgets: budgetTestData,
      });

      fixture.detectChanges();
    });

    describe('category groups', () => {
      it('has two category groups', () => {
        expect(page.categoryGroups.length).toBe(2);
      });

      describe('at the obligated row', () => {
        const columns = [
          {testId: 'Category', value: 'obligated'},
          {testId: 'Budgeted', value: '€ 100'},
          {testId: 'Activity', value: '€ 20'},
          {testId: 'Available', value: '€ 70'},
        ];

        columns.forEach(column => {
          describe(`the ${column.testId} column`, () => {
            let columnElement: HTMLDivElement;

            beforeEach(() => {
              columnElement = page.getColumnBy('obligated', column.testId);
            });

            it(`has cell value ${column.value}`, () => {
              expect(columnElement.innerText).toBe(column.value);
            });
          });
        });
      });
    });

    describe('multiple budget rows', () => {});
  });
});
