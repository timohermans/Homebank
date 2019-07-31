import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TransactionOverviewComponent} from './transaction-overview/transaction-overview.component';

const routes: Routes = [{path: 'transactions', component: TransactionOverviewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
