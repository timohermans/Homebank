import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionOverviewComponent } from './pages/transaction-overview/transaction-overview.component';
import { TransactionCreateOrEditComponent } from './pages/transaction-create-or-edit/transaction-create-or-edit.component';

const routes: Routes = [
  {
    path: 'transactions',
    component: TransactionOverviewComponent,
    children: [{ path: ':id/edit', component: TransactionCreateOrEditComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {}
