import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPipe } from './pipes/map.pipe';

@NgModule({
  declarations: [MapPipe],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
