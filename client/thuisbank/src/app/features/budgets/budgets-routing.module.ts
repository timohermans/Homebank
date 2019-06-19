import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { BudgetListComponent } from './budget-list/budget-list.component';

const routes: Routes = [{path: 'budgets', component: BudgetListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetsRoutingModule {}
