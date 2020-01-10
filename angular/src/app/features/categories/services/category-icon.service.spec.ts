import { CategoryIconService } from './category-icon.service';
import { Subject } from 'rxjs';
import { takeUntil, filter, take, skip } from 'rxjs/operators';
import { categoryIcons } from '../models/category-icon.model';
import * as _ from 'lodash';

describe('CategoryIconService', () => {
  let service: CategoryIconService;
  let destroy = new Subject<void>();

  beforeEach(() => {
    service = new CategoryIconService();
  });

  afterEach(() => {
    destroy.next();
  });

  it('by default lists all icons', done => {
    service.categoryIcons$.pipe(takeUntil(destroy)).subscribe((icons: string[]) => {
      expect(icons.length).toBe(categoryIcons.length);
      done();
    });
  });

  it('can search for an icon', done => {
    service.searchIcon('csv');

    service.categoryIcons$
      .pipe(
        filter(icons => icons.length !== categoryIcons.length),
        takeUntil(destroy)
      )
      .subscribe((icons: string[]) => {
        expect(_.some(icons, icon => icon === 'file-csv')).toBeTruthy();
        done();
      });
  });

  it('can fuzzy search for an icon', done => {
    service.categoryIcons$
      .pipe(
        filter(icons => icons.length !== categoryIcons.length),
        takeUntil(destroy)
      )
      .subscribe((icons: string[]) => {
        expect(icons.length).toBe(1);
        expect(icons[0]).toBe('file-csv');
        done();
      });

    service.searchIcon('fisv');
  });

  it('shows all icons when searching for nothing', done => {
    let hitCount = 0;
    service.categoryIcons$.pipe(takeUntil(destroy)).subscribe((icons: string[]) => {
      expect(icons.length).toBe(categoryIcons.length);

      hitCount += 1;

      if (hitCount === 2) {
        done();
      }
    });

    service.searchIcon('');
  });

  it('clears the current search when resetting', done => {
    let hitCount = 0;
    let fullCount = 0;
    let filteredCount = 0;
    service.categoryIcons$.pipe(takeUntil(destroy)).subscribe(icons => {
      if (icons.length === 2) {
        filteredCount += 1;
      }

      if (icons.length > 2) {
        fullCount += 1;
      }

      hitCount += 1;
      if (hitCount === 3) {
        expect(fullCount).toBe(2);
        expect(filteredCount).toBe(1);
        done();
      }
    });

    service.searchIcon('baby');
    service.resetSearch();
  });
});
