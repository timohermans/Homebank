import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../../models/category.model';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { CategoryIconService } from '../../services/category-icon.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
  @Output() categoryCreate = new EventEmitter<Category>();

  public icons$ = this.categoryIconService.categoryIcons$;

  public categoryForm = this.formBuilder.group({
    name: [null, Validators.required],
    icon: [null]
  });

  public get iconControl(): AbstractControl {
    return this.categoryForm.get('icon');
  }

  constructor(
    private service: CategoryService,
    private formBuilder: FormBuilder,
    private categoryIconService: CategoryIconService
  ) {}

  ngOnInit() {}

  public save(): void {
    this.service.create(this.categoryForm.value);
  }

  public search(term: string): void {
    this.categoryIconService.searchIcon(term);
  }

  public selectIcon(icon: string): void {
    this.iconControl.setValue(icon);
  }
}
