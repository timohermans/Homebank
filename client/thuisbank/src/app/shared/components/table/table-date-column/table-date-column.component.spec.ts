import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDateColumnComponent } from './table-date-column.component';

describe('TableDateColumnComponent', () => {
  let component: TableDateColumnComponent;
  let fixture: ComponentFixture<TableDateColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDateColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDateColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
