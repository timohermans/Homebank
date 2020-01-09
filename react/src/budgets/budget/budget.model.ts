export interface BudgetResponse {
  budgets: BudgetModel[];
}

export interface BudgetModel {
  id: number;
  monthForBudget: Date;
  budgeted: number;
  categoryId: number;
  categoryName: string;
  categoryGroupId: number;
  categoryGroupName: string;
  activity: number;
  available: number;
}