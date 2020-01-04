import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapPipe} from './pipes/map.pipe';
import {ToCurrencyPipe} from './pipes/to-currency.pipe';
import {TableColumnComponent} from './components/table/table-column/table-column.component';
import {TableComponent} from './components/table/table.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {TableActionComponent} from './components/table/table-action/table-action.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {IsEmptyPipe} from './pipes/is-empty.pipe';
import {TableDateColumnComponent} from './components/table/table-date-column/table-date-column.component';
import {IsLoadingModule} from '@service-work/is-loading';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

const sharedModules = [CommonModule, TranslateModule, FontAwesomeModule, IsLoadingModule, ReactiveFormsModule, FormsModule, HttpClientModule];
const pipes = [MapPipe, ToCurrencyPipe, IsEmptyPipe];
const components = [TableComponent, TableActionComponent];
const entryComponents = [TableColumnComponent, TableDateColumnComponent];

@NgModule({
  declarations: [...pipes, ...components, ...entryComponents],
  imports: [...sharedModules, NgbPaginationModule],
  exports: [...sharedModules, ...pipes, ...components, ...entryComponents],
  entryComponents: [...entryComponents]
})
export class SharedModule {
}
