import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryListItemComponent } from './components/category-list-item/category-list-item.component';

const sharedComponents = [CategoryCreateComponent, CategoryListItemComponent];

@NgModule({
  declarations: [...sharedComponents, CategoryListComponent],
  imports: [CommonModule, FormsModule, TranslateModule, FontAwesomeModule, ReactiveFormsModule],
  exports: [...sharedComponents]
})
export class CategoriesModule {}
