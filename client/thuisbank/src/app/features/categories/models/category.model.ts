import { FormGroup } from '@angular/forms';

export interface CategoryQueryResult {
  categories: Category[];
}

export class Category {
  public id: string;

  constructor(public name: string, public iconName: string) {}

  public static fromForm(form: FormGroup): Category {
    throw new Error('not implemented yet');
  }
}

export interface CategoryGroup {
  id: string;
  name: string;
}
