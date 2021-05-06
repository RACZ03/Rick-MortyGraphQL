import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoFountComponent } from './no-fount.component';

const routes: Routes = [{ path: '', component: NoFountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoFountRoutingModule { }
