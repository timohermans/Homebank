import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-transaction-create-or-edit',
  templateUrl: './transaction-create-or-edit.component.html',
  styleUrls: ['./transaction-create-or-edit.component.scss']
})
export class TransactionCreateOrEditComponent implements OnInit, AfterViewInit {
  @ViewChild('content', { static: false }) modalContent: any;

  public transactionForm = this.formBuilder.group({
    id: [null],
    payee: [null],
    memo: [null],
    category: []
  });

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.modalService
      .open(this.modalContent, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static'
      })
      .result.then(result => {}, reason => {})
      .finally(() => {
        this.router.navigate(['transactions']);
      });
  }
}
