import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BudgetsModule} from './budgets/budgets.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, BudgetsModule],
})
export class FeaturesModule {}
