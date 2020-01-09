import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { transactionReducer } from './transaction-store.reducer';

export const transactionFeatureKey = 'transaction';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature(transactionFeatureKey, transactionReducer)]
})
export class TransactionStoreModule {}
