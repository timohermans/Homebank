import { configureTestSuite } from 'ng-bullet';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionActionBarComponent } from './transaction-action-bar.component';
import { BasePage, PageUtils } from '../../../../../shared/utils/base-page';
import { MockComponent, MockModule } from 'ng-mocks';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Mock } from 'protractor/built/driverProviders';
import { TransactionsModule } from '../../../transactions.module';
import { TransactionUploadActionComponent } from '../../../components/transaction-upload-action/transaction-upload-action.component';

class Page extends BasePage<TransactionActionBarComponent> {
  constructor(fixture: ComponentFixture<TransactionActionBarComponent>) {
    super(fixture);
  }
}

describe('TransactionActionBarComponent', () => {
  let fixture: ComponentFixture<TransactionActionBarComponent>;
  let page: PageUtils<TransactionActionBarComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [MockModule(FontAwesomeModule)],
      declarations: [TransactionActionBarComponent, MockComponent(TransactionUploadActionComponent)]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionActionBarComponent);
    page = new PageUtils(fixture);
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('Has an option to upload files', () => {
    const uploadComponent = page.componentAt('app-transaction-upload-action');
    expect(uploadComponent).toBeTruthy();
  });
});
