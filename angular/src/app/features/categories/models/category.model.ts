import {FormGroup} from '@angular/forms';
import {BaseModel} from 'src/app/shared/models/base.model';

export interface CategoryQueryResult {
  categories: Category[];
}

export class Category extends BaseModel {
  constructor(public id: string, public name: string, public iconName: string) {
    super();
  }

  public static fromForm(formValue: any): Category {
    const category = new Category(formValue.id, formValue.name, formValue.icon);

    return category;
  }

  public static fromJson(values: Category): Category {
    return new Category(values.id, values.name, values.iconName);
  }

  public static fromJsonArray(categories: Category[]): Category[] {
    return categories.map(category => Category.fromJson(category));
  }

  public toForm(): any {
    return {
      id: this.id,
      name: this.name,
      icon: this.iconName
    };
  }
}

export interface CategoryGroup {
  id: string;
  name: string;
}
