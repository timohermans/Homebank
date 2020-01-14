import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {LayoutModule} from "./layout/layout.module";

const sharedModules = [LayoutModule];

@NgModule({
  declarations: [],
  imports: [SharedModule, ...sharedModules],
  exports: [...sharedModules]
})
export class CoreModule {}
