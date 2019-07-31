import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionStoreModule } from './transaction-store/transaction-store.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TransactionStoreModule,
    StoreModule.forRoot({})
  ]
})
export class StateManagementModule { }
