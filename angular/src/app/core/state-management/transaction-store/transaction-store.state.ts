import { Transaction } from 'src/app/features/transactions/entities/transaction.model';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

export const transactionAdapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>({
  selectId: transaction => transaction.id
});

export interface State extends EntityState<Transaction> {
  // additional properties
  isLoading?: boolean;
  isUploading?: boolean;
  error?: any;
}

export const initialState: State = transactionAdapter.getInitialState({
  isLoading: false,
  isUploading: false,
  error: null
});
