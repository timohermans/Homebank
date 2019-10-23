import { Component, OnInit } from '@angular/core';
import { ImportFileModalComponent } from '../import-file-modal/import-file-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transaction-upload-action',
  templateUrl: './transaction-upload-action.component.html',
  styleUrls: ['./transaction-upload-action.component.scss']
})
export class TransactionUploadActionComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  public openImportModal() {
    this.modalService.open(ImportFileModalComponent);
  }
}
