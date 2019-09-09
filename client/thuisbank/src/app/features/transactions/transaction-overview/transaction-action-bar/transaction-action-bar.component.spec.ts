import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionActionBarComponent } from './transaction-action-bar.component';
import { Page } from './transaction-action-bar.po';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImportFileModalComponent } from './import-file-modal/import-file-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';

describe('TransactionActionBarComponent', () => {
  let component: TransactionActionBarComponent;
  let fixture: ComponentFixture<TransactionActionBarComponent>;
  let page: Page;

  let modalServiceSpy: jasmine.SpyObj<NgbModal>;

  beforeEach(() => {
    modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);

    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [TransactionActionBarComponent],
      providers: [{ provide: NgbModal, useValue: modalServiceSpy }]
    }).compileComponents();

    library.add(faFileCsv);

    fixture = TestBed.createComponent(TransactionActionBarComponent);
    page = new Page(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('clicking on the import button', () => {
    beforeEach(() => {
      page.importButton.dispatchEvent(new Event('click'));
      fixture.detectChanges();
    });

    it('opens the import dialog', () => {
      expect(modalServiceSpy.open).toHaveBeenCalledWith(ImportFileModalComponent);
    });
  });
});
