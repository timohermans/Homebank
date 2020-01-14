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
  outflow: string;
  inflow: string;
  isBankTransaction: boolean;
  isInflowForBudgeting: boolean;
  category: Category;
}

export interface TransactionUpdate {
  id: string;
  categoryId: string;
}
