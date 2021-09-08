import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalCaceisRoutingModule } from './portal-caceis.routing';
import { PortalCaceisComponent } from './portal-caceis.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuLateralComponent } from './parts/menu/menu.component';


@NgModule({
	declarations: [
		PortalCaceisComponent,
		MenuLateralComponent
	],
	imports: [
		CommonModule,
		PortalCaceisRoutingModule,
		FontAwesomeModule
	],
})
export class PortalCaceisModule { }
