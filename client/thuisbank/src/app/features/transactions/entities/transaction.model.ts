import {Category} from '../../categories/models/category.model';

export interface TransactionCollectionQueryResult {
  transactions: Transaction[];
}

export interface TransactionQueryResult {
  transaction: Transaction;
}

export interface Transaction {
  id: string;
  date: Date;
  payee: string;
  memo: string;
  outFlow: number;
  inFlow: number;
  isBankTransaction: boolean;
  isInflowForBudgeting: boolean;
  category: Category;
}

export interface TransactionUpdate {
  id: string;
  payee: string;
  memo: string;
  categoryId: string;
}
