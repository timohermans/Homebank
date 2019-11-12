import { CategoryListItemComponent } from './category-list-item.component';

describe('CategoryListItemComponent', () => {
  let component: CategoryListItemComponent;

  beforeEach(() => {
    component = new CategoryListItemComponent();
  });

  it('Has a placeholder icon when nothing is supplied', () => {
    expect(component.icon).toBe('image');
  });

  it('Cannot init without supplying a name', () => {
    component.name = undefined;
    expect(() => {
      component.ngOnInit();
    }).toThrow();
  });
});
