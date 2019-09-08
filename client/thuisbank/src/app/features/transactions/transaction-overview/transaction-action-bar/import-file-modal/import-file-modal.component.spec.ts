import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportFileModalComponent} from './import-file-modal.component';
import {Page} from './import-file-modal.po';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SupportService} from 'src/app/shared/services/support.service';
import {MockComponent} from 'ng-mocks';
import {FileItemComponent} from './file-item/file-item.component';
import {cold} from 'jasmine-marbles';
import {TransactionService} from '../../../shared/services/transaction.service';

describe('ImportFileModalComponent', () => {
  let component: ImportFileModalComponent;
  let fixture: ComponentFixture<ImportFileModalComponent>;
  let page: Page;
  let activeModalSpy: jasmine.SpyObj<NgbActiveModal>;
  let supportServiceSpy: jasmine.SpyObj<SupportService>;
  let transactionServiceSpy: jasmine.SpyObj<TransactionService>;

  beforeEach(() => {
    activeModalSpy = jasmine.createSpyObj<NgbActiveModal>(['dismiss']);
    const supportService = jasmine.createSpyObj<SupportService>(['isDragAndDropAvailable']);
    supportService.isDragAndDropAvailable.and.returnValue(true);

    const transactionService = jasmine.createSpyObj<TransactionService>(['uploadFrom']);

    TestBed.configureTestingModule({
      declarations: [ImportFileModalComponent, MockComponent(FileItemComponent)],
      providers: [
        {provide: NgbActiveModal, useValue: activeModalSpy},
        {provide: SupportService, useValue: supportService},
        {provide: TransactionService, useValue: transactionService},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportFileModalComponent);
    page = new Page(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();

    supportServiceSpy = TestBed.get(SupportService);
    transactionServiceSpy = TestBed.get(TransactionService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('closing the modal', () => {
    beforeEach(() => {
      page.closeCross.click();
      fixture.detectChanges();
    });

    it('goes pretty good', () => {
      expect(activeModalSpy.dismiss).toHaveBeenCalled();
    });
  });

  describe('having no support for drag and drop', () => {
    beforeEach(() => {
      supportServiceSpy.isDragAndDropAvailable.and.returnValue(false);
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should not say "drop files here"', () => {
      expect(page.dropAreaLabel.innerText).toBe('Choose a file.');
    });
  });

  describe('hovering a file over the drop area', () => {
    beforeEach(() => {
      page.dropArea.dispatchEvent(new Event('dragenter'));
      fixture.detectChanges();
    });

    it('gives a visual cue that a file can be dropped', () => {
      expect(page.dropAreaWithFileHoveringOver).toBeTruthy();
    });

    describe('stop hovering the file over the area', () => {
      beforeEach(() => {
        page.dropArea.dispatchEvent(new Event('dragleave'));
        fixture.detectChanges();
      });

      it('stops giving a visual cue that the file can be dropped', () => {
        expect(page.dropAreaWithFileHoveringOver).toBeFalsy();
      });
    });

    describe('dropping some files in the area', () => {
      const csvType = 'application/vnd.ms-excel';
      const filesTest: File[] = [
        new File([], 'rabobank201903.csv', {type: csvType}),
        new File([], 'image-in-disquise.csv', {type: 'image/png'}),
        new File([], 'rabobank201902.csv', {type: csvType}),
      ];

      beforeEach(() => {
        const dataTransfer = new DataTransfer();
        filesTest.forEach(file => dataTransfer.items.add(file));

        page.dropArea.dispatchEvent(
          new DragEvent('drop', {
            dataTransfer,
          })
        );
        fixture.detectChanges();
      });

      it('stops giving a visual cue that the file can be dropped', () => {
        expect(page.dropAreaWithFileHoveringOver).toBeFalsy();
      });

      it('adds the file to the list of files added', () => {
        expect(page.fileList.length).toBe(filesTest.filter(file => file.type === csvType).length);
      });

      it('should add file info to the list items', () => {
        expect((page.fileList[0].componentInstance as FileItemComponent).file).toBeTruthy();
      });

      describe('submitting the form', () => {
        beforeEach(() => {
          page.dropArea.dispatchEvent(new Event('sumbit'));
        });

        it('start uploading the files', () => {
          expect(transactionServiceSpy.uploadFrom).toHaveBeenCalledWith(
            filesTest.filter(file => file.type === csvType)
          );
        });

        it('indicates that the uploading is underway', () => {
          const expectedIsUploading$ = cold('a|', {a: true});

          expect(transactionServiceSpy.isUploading$).toBeObservable(expectedIsUploading$);
        });
      });
    });
  });

  describe('trying to upload without dropping files', () => {
    beforeEach(() => {
      page.dropArea.dispatchEvent(new Event('sumbit'));
    });

    it('should not try to upload files', () => {
      expect(transactionServiceSpy.uploadFrom).toHaveBeenCalledTimes(0);
    });
  });
});
