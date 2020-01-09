import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SupportService } from 'src/app/shared/services/support.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-import-file-modal',
  templateUrl: './import-file-modal.component.html',
  styleUrls: ['./import-file-modal.component.scss']
})
export class ImportFileModalComponent implements OnInit {
  public isDragAndDropAvailable = false;
  public isFileOverArea = false;
  public isUploadingFiles = false;
  public files: File[] = [];

  constructor(
    private modal: NgbActiveModal,
    private supportService: SupportService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.isDragAndDropAvailable = this.supportService.isDragAndDropAvailable();
  }

  public dismissModal(): void {
    this.modal.dismiss();
  }

  // BUG: Error handling wrong file type transaction
  public processNew(files: FileList | File[]) {
    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
      const file = files[fileIndex];

      if (file.type === 'application/vnd.ms-excel' || file.type === 'text/csv') {
        this.files.push(file);
      }
    }
  }

  public uploadFiles(): void {
    if (this.files.length === 0) {
      return;
    }

    this.isUploadingFiles = true;
    this.transactionService.uploadFiles(this.files).subscribe(() => {
      // FEATURE: Don't close modal, but show amount of transactions successfully added
      this.isUploadingFiles = false;
      this.modal.close();
    });
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

  private preventBubblingBy(e): void {
    e.preventDefault();
    e.stopPropagation();
  }
}
