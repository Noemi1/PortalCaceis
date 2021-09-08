import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenFinanceComponent } from './open-finance.component';

const routes: Routes = [
  { path: '', component: OpenFinanceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenFinanceRoutingModule { }
