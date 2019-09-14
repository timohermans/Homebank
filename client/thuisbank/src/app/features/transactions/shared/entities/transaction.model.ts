import {Category} from '../../../categories/shared/models/category.model';

export interface TransactionQueryResult {
  transactions: Transaction[];
}

export interface Transaction {
  id: number;
  date: Date;
  payee: string;
  memo: string;
  outFlow: number;
  inFlow: number;
  isBankTransaction: boolean;
  isInflowForBudgeting: boolean;
  category: Category;
}
