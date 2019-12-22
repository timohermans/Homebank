import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  @Output() selectedIconChange = new EventEmitter<string>();

  @Input() icons: string[];
  @Input() selectedIcon: string;

  constructor() {}

  ngOnInit() {}
}
