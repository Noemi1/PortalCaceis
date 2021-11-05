import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ICMRoutingModule } from './icm.routing';
import { ListArquivosComponent } from './list-arquivos/list-arquivos.component';
import { EditArquivosComponent } from './edit-arquivos/edit-arquivos.component';
import { CreateArquivosComponent } from './create-arquivos/create-arquivos.component';
import { DeleteArquivosComponent } from './delete-arquivos/delete-arquivos.component';
import { IcmComponent } from './icm.component';


@NgModule({
	declarations: [
		ListArquivosComponent,
		EditArquivosComponent,
		CreateArquivosComponent,
		DeleteArquivosComponent,
  IcmComponent
	],
	imports: [
		CommonModule,
		ICMRoutingModule,
	]
})
export class ICMModule { }
