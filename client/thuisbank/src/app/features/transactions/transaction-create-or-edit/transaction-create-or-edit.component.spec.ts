import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCreateOrEditComponent } from './transaction-create-or-edit.component';

describe('TransactionCreateOrEditComponent', () => {
  let component: TransactionCreateOrEditComponent;
  let fixture: ComponentFixture<TransactionCreateOrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionCreateOrEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCreateOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
