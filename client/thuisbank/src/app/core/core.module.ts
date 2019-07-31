import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { StateManagementModule } from './state-management/state-management.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    StateManagementModule
  ]
})
export class CoreModule { }
