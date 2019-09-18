import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import * as _ from 'lodash';
import { ControlValueAccessor } from '@angular/forms';
import { CategoriesPerGroup } from '../../models/categories-per-group.model';

@Component({
  selector: 'app-form-category-selector',
  templateUrl: './form-category-selector.component.html',
  styleUrls: ['./form-category-selector.component.scss']
})
export class FormCategorySelectorComponent implements ControlValueAccessor, OnInit {
  @Input() set categories(categories: Category[]) {
    const categoriesPerGroup = _.groupBy(categories, category => category.categoryGroup.name);
    this.categoriesPerGroup = _.map(
      categoriesPerGroup,
      (group, key) => new CategoriesPerGroup(key, group)
    );
  }

  private onChange: (value: string) => void;

  public categoriesPerGroup: CategoriesPerGroup[];
  public selectedCategoryId: string;
  public selectedCategoryDisplay: string;

  constructor() {}

  ngOnInit() {}

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  public selectCategory(category: Category) {
    this.selectedCategoryId = category.id;
    this.selectedCategoryDisplay = `${category.categoryGroup.name} - ${category.name}`;
    this.onChange(category.id);
  }
}
