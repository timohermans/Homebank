import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import * as _ from 'lodash';
import { ControlValueAccessor, NgControl } from '@angular/forms';
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

    this.updateSelectedCategory();
  }

  private onChange: (value: string) => void;

  public categoriesPerGroup: CategoriesPerGroup[];
  public selectedCategoryId: string;
  public selectedCategoryDisplay: string;

  constructor(private controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }

  ngOnInit() {}

  writeValue(obj: string): void {
    this.selectedCategoryId = obj;
    this.updateSelectedCategory();
  }

  private updateSelectedCategory(): void {
    if (_.isEmpty(this.categories)) {
      return;
    }

    const selectedCategory = _.find(
      this.categories,
      (category: Category) => category.id === this.selectedCategoryId
    );
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  public selectCategory(category: Category) {
    this.selectedCategoryId = category.id;
    this.selectedCategoryDisplay = `${category.categoryGroup.name} - ${category.name}`;
    this.onChange(category.id);
  }
}
