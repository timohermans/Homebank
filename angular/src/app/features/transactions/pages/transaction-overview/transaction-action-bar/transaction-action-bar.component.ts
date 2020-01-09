import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImportFileModalComponent } from '../../../components/import-file-modal/import-file-modal.component';

@Component({
  selector: 'app-transaction-action-bar',
  templateUrl: './transaction-action-bar.component.html',
  styleUrls: ['./transaction-action-bar.component.css']
})
export class TransactionActionBarComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit() {}
}
