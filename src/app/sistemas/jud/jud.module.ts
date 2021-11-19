import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JudRoutingModule } from './jud.routing';
import { ListComponent } from './ordem-judicial/list/list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateComponent } from './ordem-judicial/create/create.component';
import { EditComponent } from './ordem-judicial/edit/edit.component';
import { DeleteComponent } from './ordem-judicial/delete/delete.component';


@NgModule({
	declarations: [
		ListComponent,
		CreateComponent,
		EditComponent,
		DeleteComponent
	],
	imports: [
		CommonModule,
		JudRoutingModule,
		FontAwesomeModule
	]
})
export class JudModule { }
