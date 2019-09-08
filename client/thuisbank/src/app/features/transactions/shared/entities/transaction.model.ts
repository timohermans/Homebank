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

export interface Category {
  id: number;
  name: string;
  categoryGroup: CategoryGroup;
}

export interface CategoryGroup {
  id: number;
  name: string;
}
