import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionListComponent } from './pages/transaction-overview/transaction-list/transaction-list.component';
import { TransactionOverviewComponent } from './pages/transaction-overview/transaction-overview.component';
import { TransactionHeaderComponent } from './pages/transaction-overview/transaction-header/transaction-header.component';
import { TransactionActionBarComponent } from './pages/transaction-overview/transaction-action-bar/transaction-action-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { TransactionCreateOrEditComponent } from './pages/transaction-create-or-edit/transaction-create-or-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CategoriesModule } from '../categories/categories.module';
import { TransactionUploadActionComponent } from './components/transaction-upload-action/transaction-upload-action.component';
import { ImportFileModalComponent } from './components/import-file-modal/import-file-modal.component';
import { FileItemComponent } from './components/import-file-modal/file-item/file-item.component';

@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionOverviewComponent,
    TransactionHeaderComponent,
    TransactionActionBarComponent,
    ImportFileModalComponent,
    FileItemComponent,
    TransactionCreateOrEditComponent,
    TransactionUploadActionComponent
  ],
  entryComponents: [ImportFileModalComponent],
  imports: [
    SharedModule,
    TransactionsRoutingModule,
    NgbModalModule,
    CategoriesModule,
  ],
  exports: [TransactionListComponent],
  providers: []
})
export class TransactionsModule {
  constructor() {
    library.add(fas);
  }
}
