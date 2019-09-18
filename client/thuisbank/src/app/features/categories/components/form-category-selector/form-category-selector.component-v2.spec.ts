import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCategorySelectorComponent } from './form-category-selector.component';
import { Category } from '../../models/category.model';
import { BasePage } from '../../../../shared/utils/base-page';
import { configureTestSuite } from 'ng-bullet';
import { CategoriesPerGroup } from '../../models/categories-per-group.model';
import { FormsModule } from '@angular/forms';

class Page extends BasePage<FormCategorySelectorComponent> {
  public get categoryGroups(): HTMLDivElement[] {
    return this.queryNativeElements<HTMLDivElement>('.group__title');
  }

  public get searchInput(): HTMLInputElement {
    return this.queryNativeElement('.category-select__search');
  }

  constructor(fixture: ComponentFixture<FormCategorySelectorComponent>) {
    super(fixture);
  }

  public getCategoriesAtGroupIndex(groupIndex: number): HTMLLIElement[] {
    return this.queryNativeElements(
      `.category-select__groups .category-select__group:nth-child(${groupIndex +
        1}) .group__category-item`
    );
  }

  public getCategoryAt(groupIndex: number, categoryIndex: number): HTMLElement {
    return this.queryNativeElement(
      `.category-select__groups .category-select__group:nth-child(${groupIndex +
        1}) .group__category-item:nth-child(${categoryIndex + 1})`
    );
  }
}

describe('FormCategorySelectorComponent', () => {
  let fixture: ComponentFixture<FormCategorySelectorComponent>;
  let page: Page;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [FormCategorySelectorComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCategorySelectorComponent);
    page = new Page(fixture);
  });

  describe('Receiving available categories', () => {
    let categories: Category[];
    let expectedCategoriesPerGroup: CategoriesPerGroup[];

    beforeEach(() => {
      categories = [
        { id: '1', name: 'cat 1', categoryGroup: { id: '1', name: 'group 1' } },
        { id: '2', name: 'cat 2', categoryGroup: { id: '1', name: 'group 1' } },
        { id: '3', name: 'cat 3', categoryGroup: { id: '1', name: 'group 1' } },
        { id: '4', name: 'cat 4', categoryGroup: { id: '2', name: 'group 2' } },
        { id: '5', name: 'cat 5', categoryGroup: { id: '2', name: 'group 2' } },
        { id: '6', name: 'cat 6', categoryGroup: { id: '2', name: 'group 2' } }
      ];

      expectedCategoriesPerGroup = [
        {
          groupName: 'group 1',
          categories: [
            { id: '1', name: 'cat 1', categoryGroup: { id: '1', name: 'group 1' } },
            { id: '2', name: 'cat 2', categoryGroup: { id: '1', name: 'group 1' } },
            { id: '3', name: 'cat 3', categoryGroup: { id: '1', name: 'group 1' } }
          ]
        },
        {
          groupName: 'group 2',
          categories: [
            { id: '4', name: 'cat 4', categoryGroup: { id: '2', name: 'group 2' } },
            { id: '5', name: 'cat 5', categoryGroup: { id: '2', name: 'group 2' } },
            { id: '6', name: 'cat 6', categoryGroup: { id: '2', name: 'group 2' } }
          ]
        }
      ];

      fixture.componentInstance.categories = categories;
      fixture.detectChanges();
    });

    it('Groups them by category group', () => {
      expect(page.categoryGroups.length).toBe(2);

      expectedCategoriesPerGroup.forEach(
        (categoriesPerGroup: CategoriesPerGroup, index: number) => {
          expect(page.categoryGroups[index].textContent).toBe(categoriesPerGroup.groupName);

          const categories = page.getCategoriesAtGroupIndex(index);
          expect(categories.length).toBe(categoriesPerGroup.categories.length);

          categoriesPerGroup.categories.forEach((category: Category, index: number) => {
            expect(categories[index].textContent).toContain(category.name);
          });
        }
      );
    });

    describe('Selecting a category', () => {
      const expectedOnChange = jest.fn();
      const expectedGroupIndex = 0;
      const expectedCategoryIndex = 1;
      let expectedCategory: Category;
      let categoryElement: HTMLElement;

      beforeEach(() => {
        expectedOnChange.mockReset();
        expectedCategory = expectedCategoriesPerGroup[expectedGroupIndex].categories[expectedCategoryIndex];
        fixture.componentInstance.registerOnChange(expectedOnChange);
        categoryElement = page.getCategoryAt(expectedGroupIndex, expectedCategoryIndex);
        categoryElement.click();
        fixture.detectChanges();
      });

      it("Let's the parent know that a category is selected", () => {
        expect(expectedOnChange).toHaveBeenCalled();
      });

      it('Displays the selected category', () => {
        expect(page.searchInput.value).toBe(
          `${expectedCategory.categoryGroup.name} - ${expectedCategory.name}`
        );
      });
    });
  });
});
