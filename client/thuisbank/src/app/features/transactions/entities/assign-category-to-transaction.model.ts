import { Category } from '../../categories/models/category.model';
import { FormGroup } from '@angular/forms';

export class AssignCategoryToTransactionModel {
  constructor(public id: string, public category: Category) {}

  public static fromForm(form: FormGroup): AssignCategoryToTransactionModel {
    const formValue = form.value;
    const category = form.value.category || {};

    return new AssignCategoryToTransactionModel(formValue.id, new Category(category.id, category.name, category.iconName));
  }
}
