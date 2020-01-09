import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCategorySelectorComponent } from './components/form-category-selector/form-category-selector.component';
import {FormsModule} from "@angular/forms";

const sharedComponents = [FormCategorySelectorComponent];

@NgModule({
  declarations: [...sharedComponents],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [...sharedComponents]
})
export class CategoriesModule { }
