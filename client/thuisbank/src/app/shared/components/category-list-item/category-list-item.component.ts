import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/features/categories/models/category.model';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.scss']
})
export class CategoryListItemComponent implements OnInit {
  @Input() category: Category;

  constructor() {}

  ngOnInit() {
    if (!this.category) {
      throw new Error('Supply a category');
    }
  }
}
