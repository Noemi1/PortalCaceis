import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenFinanceRoutingModule } from './open-finance.routing';
import { OpenFinanceComponent } from './open-finance.component';


@NgModule({
  declarations: [
    OpenFinanceComponent
  ],
  imports: [
    CommonModule,
    OpenFinanceRoutingModule
  ]
})
export class OpenFinanceModule { }
