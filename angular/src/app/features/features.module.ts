import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetsModule } from './budgets/budgets.module';
import { TransactionsModule } from './transactions/transactions.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, BudgetsModule, TransactionsModule]
})
export class FeaturesModule {}
