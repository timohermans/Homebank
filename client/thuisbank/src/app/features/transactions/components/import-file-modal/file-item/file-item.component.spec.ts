import { configureTestSuite } from 'ng-bullet';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageUtils } from '../../../../../shared/utils/base-page';
import { FileItemComponent } from './file-item.component';

describe('FileItemComponent', () => {
  let fixture: ComponentFixture<FileItemComponent>;
  let page: PageUtils<FileItemComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [FileItemComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileItemComponent);
    page = new PageUtils<FileItemComponent>(fixture);
  });

  it('Displays the file name', () => {
    page.class.file = new File([], 'test.csv');
    page.updateView();
    expect(page.elementAt<HTMLDivElement>('.file__name').textContent).toBe('test.csv');
  });
});
