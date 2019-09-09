import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionListComponent } from './transaction-overview/transaction-list/transaction-list.component';
import { TransactionOverviewComponent } from './transaction-overview/transaction-overview.component';
import { TransactionHeaderComponent } from './transaction-overview/transaction-header/transaction-header.component';
import { TransactionActionBarComponent } from './transaction-overview/transaction-action-bar/transaction-action-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImportFileModalComponent } from './transaction-overview/transaction-action-bar/import-file-modal/import-file-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FileItemComponent } from './transaction-overview/transaction-action-bar/import-file-modal/file-item/file-item.component';
import { TransactionCreateOrEditComponent } from './transaction-create-or-edit/transaction-create-or-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionOverviewComponent,
    TransactionHeaderComponent,
    TransactionActionBarComponent,
    ImportFileModalComponent,
    FileItemComponent,
    TransactionCreateOrEditComponent
  ],
  entryComponents: [ImportFileModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TransactionsRoutingModule,
    HttpClientModule,
    NgbModalModule,
    FontAwesomeModule,
    TranslateModule
  ],
  exports: [TransactionListComponent],
  providers: []
})
export class TransactionsModule {
  constructor() {
    library.add(fas);
  }
}
