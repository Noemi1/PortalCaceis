import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalCaceisComponent } from './portal-caceis.component';

const routes: Routes = [
	{ path: '', component: PortalCaceisComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PortalCaceisRoutingModule { }
