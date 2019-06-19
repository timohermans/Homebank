import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BudgetListComponent} from './budget-list.component';
import {By} from '@angular/platform-browser';
import {MockComponent} from 'ng-mocks';
import * as moment from 'moment';
import {BudgetHeaderComponent} from '../budget-header/budget-header.component';

class Page {
  public get budgetHeader(): BudgetHeaderComponent {
    return this.fixture.debugElement.query(By.css('app-budget-header')).componentInstance;
  }

  constructor(private fixture: ComponentFixture<BudgetListComponent>) {}
}

describe('BudgetListComponent', () => {
  let component: BudgetListComponent;
  let fixture: ComponentFixture<BudgetListComponent>;
  let page: Page;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetListComponent, MockComponent(BudgetHeaderComponent)],
    }).compileComponents();
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

    it('should be given the current month by default', () => {
      expect(page.budgetHeader.month).toEqual(moment().startOf('month'));
    });

    describe('receiving a month change event', () => {
      it('should dispatch a request to retrieve new budgets', () => {});
    });
  });
});
