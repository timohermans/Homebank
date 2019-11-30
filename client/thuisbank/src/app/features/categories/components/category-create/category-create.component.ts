import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../../models/category.model';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
  @Output() categoryCreate = new EventEmitter<Category>();

  public categoryForm = this.formBuilder.group({
    name: [null, Validators.required],
    icon: [null]
  });

  constructor(private service: CategoryService, private formBuilder: FormBuilder) {}

  ngOnInit() {}

  public save(): void {
    this.service.create(this.categoryForm.value);
  }
}
