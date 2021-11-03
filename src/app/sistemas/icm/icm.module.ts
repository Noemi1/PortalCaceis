import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ICMRoutingModule } from './icm-routing.module';
import { ListArquivosComponent } from 'src/app/list-arquivos/list-arquivos.component';
import { CreateArquivoComponent } from 'src/app/create-arquivo/create-arquivo.component';
import { EditArquivoComponent } from 'src/app/edit-arquivo/edit-arquivo.component';
import { DeleteArquivoComponent } from 'src/app/delete-arquivo/delete-arquivo.component';


@NgModule({
	declarations: [
		ListArquivosComponent,
		CreateArquivoComponent,
		EditArquivoComponent,
		DeleteArquivoComponent,
	],
	imports: [
		CommonModule,
		ICMRoutingModule,
	]
})
export class ICMModule { }
