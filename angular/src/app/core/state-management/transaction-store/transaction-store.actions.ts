import { Action } from '@ngrx/store';
import { Transaction } from 'src/app/features/transactions/entities/transaction.model';

export enum ActionTypes {
  SET_ALL_TRANSACTIONS = '[Transaction Overview] Set all transactions'
}

export class SetAllTransactions implements Action {
  readonly type = ActionTypes.SET_ALL_TRANSACTIONS;

  constructor(public payload: { transactions: Transaction[] }) {}
}

export type Actions = SetAllTransactions;
