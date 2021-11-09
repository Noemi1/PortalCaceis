import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilComponent } from './perfil.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { PerfilRoutingModule } from './perfil.routing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwPaginationModule } from 'jw-angular-pagination';
import { AppComponent } from 'src/app/app.component';


@NgModule({
	declarations: [
		PerfilComponent,
		CreateComponent,
		DeleteComponent,
		EditComponent,
		ListComponent
	],
	imports: [
		CommonModule,
		PerfilRoutingModule,
		FontAwesomeModule,
		JwPaginationModule
	],
	bootstrap: [AppComponent]
})
export class PerfilModule { }
