import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetsRoutingModule } from './budgets-routing.module';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetHeaderComponent } from './budget-header/budget-header.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [BudgetListComponent, BudgetHeaderComponent],
  imports: [
    CommonModule,
    BudgetsRoutingModule,
    SharedModule
  ]
})
export class BudgetsModule { }
