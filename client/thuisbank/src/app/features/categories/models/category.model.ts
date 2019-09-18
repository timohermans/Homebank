export interface CategoryQueryResult {
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  categoryGroup: CategoryGroup;
}

export interface CategoryGroup {
  id: string;
  name: string;
}
