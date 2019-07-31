import {ComponentFixture} from '@angular/core/testing';
import {TransactionActionBarComponent} from './transaction-action-bar.component';

export class Page {
  public get importButton(): HTMLButtonElement {
    return this.fixture.nativeElement.querySelector('[data-test-id="import"]') as HTMLButtonElement;
  }

  constructor(private fixture: ComponentFixture<TransactionActionBarComponent>) {}
}
