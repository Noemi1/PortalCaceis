import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwPaginationModule } from 'jw-angular-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { ICMRoutingModule } from './icm.routing';
import { ArquivosService } from './services/arquivos.service';
import { ListArquivosComponent } from './components/list-arquivos/list-arquivos.component';
import { EditArquivosComponent } from './components/edit-arquivos/edit-arquivos.component';
import { CreateArquivosComponent } from './components/create-arquivos/create-arquivos.component';
import { DeleteArquivosComponent } from './components/delete-arquivos/delete-arquivos.component';
import { IcmComponent } from './components/icm.component';


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
		FontAwesomeModule,
		JwPaginationModule,
		FormsModule,
	],
	providers: [
		ArquivosService,
		Crypto
	]
})
export class ICMModule { }
