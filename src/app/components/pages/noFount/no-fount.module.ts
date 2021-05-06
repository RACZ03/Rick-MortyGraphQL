import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoFountRoutingModule } from './no-fount-routing.module';
import { NoFountComponent } from './no-fount.component';


@NgModule({
  declarations: [NoFountComponent],
  imports: [
    CommonModule,
    NoFountRoutingModule
  ]
})
export class NoFountModule { }
