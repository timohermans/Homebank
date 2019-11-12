import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.scss']
})
export class CategoryListItemComponent implements OnInit {
  @Input() name: string;
  @Input() icon = 'image';

  constructor() {}

  ngOnInit() {
    if (!this.name) {
      throw new Error('Supply a category name');
    }
  }
}
