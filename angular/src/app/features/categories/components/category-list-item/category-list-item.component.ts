import {Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.scss']
})
export class CategoryListItemComponent implements OnInit, OnChanges {
  @Output() iconSelectChange = new EventEmitter<string>();
  @Input() icon: string;
  @Input() name: string;
  @Input() isSelected = false;
  @Input() isLoading = false;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isLoading && changes.isLoading.currentValue === true) {
      this.icon = 'hourglass';
    }
  }
}
