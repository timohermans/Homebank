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
import { ImportFileModalComponent } from './pages/transaction-overview/transaction-action-bar/import-file-modal/import-file-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FileItemComponent } from './pages/transaction-overview/transaction-action-bar/import-file-modal/file-item/file-item.component';
import { TransactionCreateOrEditComponent } from './pages/transaction-create-or-edit/transaction-create-or-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CategoriesModule } from '../categories/categories.module';

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
    TranslateModule,
    CategoriesModule
  ],
  exports: [TransactionListComponent],
  providers: []
})
export class TransactionsModule {
  constructor() {
    library.add(fas);
  }
}
