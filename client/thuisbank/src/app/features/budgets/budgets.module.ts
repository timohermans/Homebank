import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetsRoutingModule } from './budgets-routing.module';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetHeaderComponent } from './budget-header/budget-header.component';

@NgModule({
  declarations: [BudgetListComponent, BudgetHeaderComponent],
  imports: [
    CommonModule,
    BudgetsRoutingModule
  ]
})
export class BudgetsModule { }
