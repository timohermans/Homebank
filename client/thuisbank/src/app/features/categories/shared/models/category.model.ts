export interface CategoryQueryResult {
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  categoryGroup: CategoryGroup;
}

export interface CategoryGroup {
  id: number;
  name: string;
}
