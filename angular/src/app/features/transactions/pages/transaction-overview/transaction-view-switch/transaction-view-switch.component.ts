import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransactionViewMode} from "../../../entities/transaction.enum";

@Component({
  selector: 'app-transaction-view-switch',
  templateUrl: './transaction-view-switch.component.html',
  styleUrls: ['./transaction-view-switch.component.scss']
})
export class TransactionViewSwitchComponent implements OnInit {
  viewMode = TransactionViewMode;
  @Input() viewModeActive: TransactionViewMode = TransactionViewMode.List;
  @Output() viewModeActiveChange = new EventEmitter<TransactionViewMode>();

  constructor() {
  }

  ngOnInit() {
  }

  public select(viewMode: TransactionViewMode): void {
    this.viewModeActive = viewMode;
    this.viewModeActiveChange.emit(viewMode);
  }
}
