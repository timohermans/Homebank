import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { State as TransactionState, transactionAdapter } from './transaction-store.state';
import { Transaction } from 'src/app/features/transactions/shared/entities/transaction.model';
import { transactionFeatureKey } from './transaction-store.module';

export const getError = (state: TransactionState): any => state.error;
export const getIsLoading = (state: TransactionState): boolean => state.isLoading;

export const selectTransaction: MemoizedSelector<object, TransactionState> = createFeatureSelector<
  TransactionState
>(transactionFeatureKey);

export const selectAllTransactionItems: (
  state: object
) => Transaction[] = transactionAdapter.getSelectors(selectTransaction).selectAll;

export const selectTransactionById = (id: number) =>
  createSelector(
    this.selectAllTransactionItems,
    (allTransactions: Transaction[]) => {
      if (allTransactions) {
        return allTransactions.find(t => t.id === id);
      } else {
        return null;
      }
    }
  );

export const selectTransactionError: MemoizedSelector<object, any> = createSelector(
  selectTransaction,
  getError
);

export const selectTransactionIsLoading: MemoizedSelector<object, boolean> = createSelector(
  selectTransaction,
  getIsLoading
);

export const selectTransactionIsUploading = createSelector(
  selectTransaction,
  (state: TransactionState) => state.isUploading
);
