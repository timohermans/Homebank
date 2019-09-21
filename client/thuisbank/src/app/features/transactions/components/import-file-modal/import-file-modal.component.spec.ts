import { configureTestSuite } from 'ng-bullet';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportFileModalComponent } from './import-file-modal.component';
import { PageUtils } from '../../../../shared/utils/base-page';
import { MockComponent } from 'ng-mocks';
import { FileItemComponent } from './file-item/file-item.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

jest.mock('@ng-bootstrap/ng-bootstrap');

describe('ImportFileModalComponent', () => {
  let fixture: ComponentFixture<ImportFileModalComponent>;
  let page: PageUtils<ImportFileModalComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ImportFileModalComponent, MockComponent(FileItemComponent)],
      providers: [{ provide: NgbActiveModal, useClass: NgbActiveModal }]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportFileModalComponent);
    page = new PageUtils<ImportFileModalComponent>(fixture);
  });

  it('Handles file selections', () => {
    page.class.processNew = jest.fn();
    const fileInput = page.elementAt<HTMLInputElement>('.file__upload');
    fileInput.dispatchEvent(new Event('change'));
    expect(page.class.processNew).toHaveBeenCalled();
  });

  it('Displays the csv files that are selected', () => {
    page.class.processNew([
      new File([], 'test.csv', { type: 'application/vnd.ms-excel' }),
      new File([], 'test2.csv', { type: 'application/vnd.ms-excel' }),
      new File([], 'test3.csv', { type: 'img/jpg' })
    ]);

    page.updateView();

    const fileList = page.elementsAt<HTMLDivElement>('app-file-item');
    expect(fileList.length).toBe(2);
  });
});
