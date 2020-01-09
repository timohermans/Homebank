import { configureTestSuite } from 'ng-bullet';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportFileModalComponent } from './import-file-modal.component';
import { PageUtils } from '../../../../shared/utils/base-page';
import { MockComponent } from 'ng-mocks';
import { FileItemComponent } from './file-item/file-item.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { of, Subject } from 'rxjs';

jest.mock('@ng-bootstrap/ng-bootstrap');
jest.mock('../../services/transaction.service');

describe('ImportFileModalComponent', () => {
  let fixture: ComponentFixture<ImportFileModalComponent>;
  let page: PageUtils<ImportFileModalComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ImportFileModalComponent, MockComponent(FileItemComponent)],
      providers: [
        { provide: NgbActiveModal, useClass: NgbActiveModal },
        { provide: TransactionService, useClass: TransactionService }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportFileModalComponent);
    page = new PageUtils<ImportFileModalComponent>(fixture);

    page.serviceInstance<TransactionService>(TransactionService).uploadFiles.mockReset();
    page
      .serviceInstance<TransactionService>(TransactionService)
      .uploadFiles.mockReturnValue(new Subject<any>());
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

    const fileList = page.componentsAt('app-file-item');
    expect(fileList.length).toBe(2);
    expect((fileList[0].componentInstance as FileItemComponent).file.name).toBe('test.csv');
    expect((fileList[1].componentInstance as FileItemComponent).file.name).toBe('test2.csv');
  });

  describe('When selecting a file and starting the upload', () => {
    beforeEach(() => {
      page.class.processNew([new File([], 'test.csv', { type: 'application/vnd.ms-excel' })]);
      page.updateView();

      page.buttonAt('.file__submit').click();
      page.updateView();
    });

    it('Passes the files to the API', () => {
      expect(
        page.serviceInstance<TransactionService>(TransactionService).uploadFiles
      ).toHaveBeenCalled();
    });

    it('Shows a loading indicator', () => {
      expect(page.componentAt('.file__loading-indicator')).toBeTruthy();
    });

    it('Disables the upload button', () => {
      const uploadButton = page.buttonAt('.file__submit');
      expect(uploadButton.disabled).toBeTruthy();
    });
  });

  describe('When the uploading of files is finished', () => {
    beforeEach(() => {
      page
        .serviceInstance<TransactionService>(TransactionService)
        .uploadFiles.mockReturnValue(of({}));
      page.class.processNew([new File([], 'test.csv', { type: 'application/vnd.ms-excel' })]);
      page.updateView();

      page.buttonAt('.file__submit').click();
      page.updateView();
    });

    it('Stops showing a loading indicator', () => {
      expect(page.componentAt('.file__loading-indicator')).toBeFalsy();
    });

    it('Enables the upload button', () => {
      const uploadButton = page.buttonAt('.file__submit');
      expect(uploadButton.disabled).toBeFalsy();
    });

    it('Closes the modal', () => {
      expect(page.serviceOf(NgbActiveModal).close).toHaveBeenCalled();
    });
  });

  it('When uploading without files, nothing happens', () => {
    page.buttonAt('.file__submit').click();
    page.updateView();
    expect(page.serviceOf(TransactionService).uploadFiles).toHaveBeenCalledTimes(0);
  });
});
