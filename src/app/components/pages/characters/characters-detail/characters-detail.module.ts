import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersDetailRoutingModule } from './characters-detail-routing.module';
import { CharactersDetailComponent } from './characters-detail.component';
import { CharactersCardModule } from '../characters-card/characters-card.module';


@NgModule({
  declarations: [CharactersDetailComponent],
  imports: [
    CommonModule,
    CharactersDetailRoutingModule,
    CharactersCardModule
  ]
})
export class CharactersDetailModule { }
