import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { transactionReducer } from './transaction-store.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('transaction', transactionReducer)
  ]
})
export class TransactionStoreModule { }
