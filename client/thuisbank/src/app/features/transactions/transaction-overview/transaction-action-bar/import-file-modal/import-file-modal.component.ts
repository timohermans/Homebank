import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SupportService} from 'src/app/shared/services/support.service';
import {TransactionFacade} from '../../../shared/transaction.facade';

@Component({
  selector: 'app-import-file-modal',
  templateUrl: './import-file-modal.component.html',
  styleUrls: ['./import-file-modal.component.scss'],
})
export class ImportFileModalComponent implements OnInit {
  public isDragAndDropAvailable = false;
  public isFileOverArea = false;
  public files: File[] = [];

  constructor(
    private thisModal: NgbActiveModal,
    private supportService: SupportService,
    private transactionFacade: TransactionFacade
  ) {}

  ngOnInit() {
    this.isDragAndDropAvailable = this.supportService.isDragAndDropAvailable();
  }

  public dismissModal(): void {
    this.thisModal.dismiss();
  }

  public onFileOverArea(e): void {
    this.isFileOverArea = true;

    this.preventBubblingBy(e);
  }

  public onFileLeavesArea(e): void {
    this.isFileOverArea = false;

    this.preventBubblingBy(e);
  }

  public onFileDropped(dropEvent: DragEvent): void {
    this.onFileLeavesArea(dropEvent);

    if (dropEvent.dataTransfer && dropEvent.dataTransfer.files) {
      this.processNew(dropEvent.dataTransfer.files);
    }

    this.preventBubblingBy(dropEvent);
  }

  private processNew(files: FileList) {
    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
      const file = files.item(fileIndex);

      if (file.type === 'application/vnd.ms-excel') {
        this.files.push(file);
      }
    }
  }

  private preventBubblingBy(e): void {
    e.preventDefault();
    e.stopPropagation();
  }

  public uploadFiles(): void {
    if (this.files.length === 0) {
      return;
    }

    this.transactionFacade.uploadFrom(this.files);
  }
}
