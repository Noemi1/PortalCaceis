import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ICMRoutingModule } from './icm.routing';
import { ListArquivosComponent } from './components/list-arquivos/list-arquivos.component';
import { IcmComponent } from './components/icm.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwPaginationModule } from 'jw-angular-pagination';
import { EditArquivosComponent } from './components/edit-arquivos/edit-arquivos.component';
import { CreateArquivosComponent } from './components/create-arquivos/create-arquivos.component';
import { DeleteArquivosComponent } from './components/delete-arquivos/delete-arquivos.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ArquivosService } from './services/arquivos.service';
import { HttpClient } from '@angular/common/http';
import { Crypto } from 'src/app/utils/cryptojs';


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
		ToastrModule,
	],
	providers: [
		ArquivosService,
		Crypto
	]
})
export class ICMModule { }
