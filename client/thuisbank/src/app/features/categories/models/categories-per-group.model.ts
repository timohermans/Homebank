import { Category } from './category.model';

export class CategoriesPerGroup {
  constructor(public groupName: string, public categories: Category[]) {}
}
