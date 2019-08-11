import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
  TransactionStoreActions,
  TransactionStoreSelectors,
} from 'src/app/core/state-management/transaction-store';
import {RootStoreState} from 'src/app/core/state-management';
import {Transaction} from './entities/transaction.model';
import {TransactionService} from './services/transaction.service';

@Injectable()
export class TransactionFacade {
  // these are the store select statements
  // It's pretty dirty to have them all over our components
  // Our components just want to get streams of data, no matter where they come from
  transactions$ = this.store.select(TransactionStoreSelectors.selectAllTransactionItems);
  isUploading$ = this.store.pipe(select(TransactionStoreSelectors.selectTransaction), select(state => state.isUploading));

  constructor(
    private store: Store<RootStoreState.State>,
    private transactionService: TransactionService
  ) {
  }

  loadTransactions(): void {
    this.transactionService.fetchAll().subscribe((transactions: Array<Transaction>) => {
      this.store.dispatch(new TransactionStoreActions.SetAllTransactions({transactions}));
    });
  }

  public uploadFrom(files: File[]): void {
    const formData = new FormData();
    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
      const file = files[fileIndex];
      formData.append(`file-${fileIndex}`, file);
    }

    this.transactionService.upload(formData).subscribe(() => this.loadTransactions());
  }
}
