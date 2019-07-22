import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPipe } from './pipes/map.pipe';
import { ToCurrencyPipe } from './pipes/to-currency.pipe';

@NgModule({
  declarations: [MapPipe, ToCurrencyPipe],
  imports: [
    CommonModule
  ],
  exports: [
    MapPipe,
    ToCurrencyPipe
  ]
})
export class SharedModule { }
