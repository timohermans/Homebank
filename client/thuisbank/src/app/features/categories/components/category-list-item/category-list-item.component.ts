import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.scss']
})
export class CategoryListItemComponent implements OnInit {
  @Output() iconSelectChange = new EventEmitter<string>();
  @Input() icon: string;
  @Input() name: string;
  @Input() isSelected = false;

  constructor() {}

  ngOnInit() {}
}
