import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JudRoutingModule } from './jud.routing';
import { ListComponent } from './ordem-judicial/list/list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateComponent } from './ordem-judicial/create/create.component';
import { EditComponent } from './ordem-judicial/edit/edit.component';
import { DeleteComponent } from './ordem-judicial/delete/delete.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { FilterComponent } from './ordem-judicial/filter/filter.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
	declarations: [
		ListComponent,
		CreateComponent,
		EditComponent,
		DeleteComponent,
  		FilterComponent
	],
	imports: [
		CommonModule,
		JudRoutingModule,
		FontAwesomeModule,
		JwPaginationModule,
		FormsModule,
		NgxMaskModule
		
	]
})
export class JudModule { }
