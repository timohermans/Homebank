import { TransactionCreateOrEditComponent } from './transaction-create-or-edit.component';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from '../../categories/shared/services/category.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { of } from 'rxjs';
jest.mock('@ng-bootstrap/ng-bootstrap');
jest.mock('../../categories/shared/services/category.service');
jest.mock('@angular/router');

describe('TransactionCreateOrEditComponent', () => {
  let formBuilder: FormBuilder;
  let categoryService: jest.Mocked<CategoryService>;
  let modalService: jest.Mocked<NgbModal>;
  let modalRef: jest.Mocked<NgbModalRef>;
  let router: jest.Mocked<Router>;
  let component: TransactionCreateOrEditComponent;

  beforeEach(() => {
    formBuilder = new FormBuilder();

    categoryService = new CategoryService(null) as jest.Mocked<CategoryService>;
    categoryService.getAll.mockReturnValue(of([]));

    modalRef = new NgbModalRef(null, null, null, null) as jest.Mocked<NgbModalRef>;
    modalRef.result = Promise.resolve();
    modalService = new NgbModal(null, null, null, null) as jest.Mocked<NgbModal>;
    modalService.open.mockReturnValue(modalRef);

    router = new Router(null, null, null, null, null, null, null, null) as jest.Mocked<Router>;
    component = new TransactionCreateOrEditComponent(
      formBuilder,
      categoryService,
      modalService,
      router
    );
  });

  describe('when loading the component', () => {
    beforeEach(() => {
      component.ngAfterViewInit();
    });

    it('has openend the modal', () => {
      expect(modalService.open).toHaveBeenCalled();
    });
  });
});
