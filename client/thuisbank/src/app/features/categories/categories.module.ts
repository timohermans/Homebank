import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { CategoryCreateComponent } from './components/category-create/category-create.component';

const sharedComponents = [CategoryCreateComponent];

@NgModule({
  declarations: [...sharedComponents],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [...sharedComponents]
})
export class CategoriesModule { }
