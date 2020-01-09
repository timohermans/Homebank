import { configureTestSuite } from 'ng-bullet';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageUtils } from '../../../../shared/utils/base-page';
import { TransactionUploadActionComponent } from './transaction-upload-action.component';
import { MockModule } from 'ng-mocks';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImportFileModalComponent } from '../import-file-modal/import-file-modal.component';

jest.mock('@ng-bootstrap/ng-bootstrap');

describe('TransactionUploadActionComponent', () => {
  let fixture: ComponentFixture<TransactionUploadActionComponent>;
  let page: PageUtils<TransactionUploadActionComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [MockModule(FontAwesomeModule)],
      declarations: [TransactionUploadActionComponent],
      providers: [{ provide: NgbModal, useClass: NgbModal }]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionUploadActionComponent);
    page = new PageUtils<TransactionUploadActionComponent>(fixture);
  });

  it('Has a button to open a modal for uploading transactions', () => {
    page.updateView();

    page.elementAt<HTMLButtonElement>('[data-test-id="import"]').click();

    expect(page.serviceOf(NgbModal).open).toHaveBeenCalledWith(ImportFileModalComponent);
  });
});
