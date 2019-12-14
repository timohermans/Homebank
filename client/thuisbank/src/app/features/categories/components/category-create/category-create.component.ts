import { Component, OnInit, Output, EventEmitter, OnDestroy, Optional } from '@angular/core';
import { Category } from '../../models/category.model';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ControlValueAccessor,
  NgControl
} from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { CategoryIconService } from '../../services/category-icon.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit, ControlValueAccessor, OnDestroy {
  public icons$ = this.categoryIconService.categoryIcons$;

  public categoryForm = this.formBuilder.group({
    id: [null],
    name: [null, Validators.required],
    icon: [null, Validators.required]
  });

  public get iconControl(): AbstractControl {
    return this.categoryForm.get('icon');
  }

  private onChange: (category: Category) => void = (category: Category) => {};

  constructor(
    @Optional() controlDir: NgControl,
    private service: CategoryService,
    private formBuilder: FormBuilder,
    private categoryIconService: CategoryIconService
  ) {
    if (controlDir) {
      controlDir.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.registerValueChanges();
  }

  private registerValueChanges(): void {
    this.categoryForm.valueChanges
      .pipe(
        // filter(() => this.categoryForm.valid),
        untilDestroyed(this)
      )
      .subscribe(formValue => {
        if (this.categoryForm.invalid) {
          this.onChange(null);
        } else {
          this.onChange(Category.fromForm(formValue));
        }
      } );
  }

  ngOnDestroy(): void {}

  public search(term: string): void {
    this.categoryIconService.searchIcon(term);
  }

  public selectIcon(icon: string): void {
    this.iconControl.setValue(icon);
  }

  writeValue(obj: Category): void {
    if (!obj) {
      return;
    }

    this.categoryForm.setValue(obj.toForm());
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {}
}
