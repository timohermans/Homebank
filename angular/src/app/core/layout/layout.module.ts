import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import {SharedModule} from "../../shared/shared.module";

const sharedComponents = [PageNotFoundComponent, HeaderComponent];

@NgModule({
  declarations: [...sharedComponents],
  exports: [...sharedComponents],
  imports: [SharedModule]
})
export class LayoutModule {}
