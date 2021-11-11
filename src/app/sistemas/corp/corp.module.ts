import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwPaginationModule } from 'jw-angular-pagination';

import { CorpRoutingModule } from './corp.routing';
import { CorpComponent } from './corp.component';
import { ListComponent } from './components/perfil/list/list.component';
import { CreateComponent } from './components/perfil/create/create.component';
import { EditComponent } from './components/perfil/edit/edit.component';
import { DeleteComponent } from './components/perfil/delete/delete.component';
import { SistemasComponent } from './components/sistemas/sistemas.component';


@NgModule({
	declarations: [
		CorpComponent,
		ListComponent,
		CreateComponent,
		EditComponent,
		DeleteComponent,
	],
	imports: [
		CommonModule,
		CorpRoutingModule,
		FontAwesomeModule,
		JwPaginationModule,
		FormsModule,
	]
})
export class CorpModule { }
