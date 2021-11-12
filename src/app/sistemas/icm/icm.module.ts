import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwPaginationModule } from 'jw-angular-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { ICMRoutingModule } from './icm.routing';
import { ArquivosService } from './services/arquivos.service';
import { ListArquivosComponent } from './components/historico-de-transferencias/list-arquivos/list-arquivos.component';
import { EditArquivosComponent } from './components/historico-de-transferencias/edit-arquivos/edit-arquivos.component';
import { IcmComponent } from './components/icm.component';
import { CreateArquivosComponent } from './components/historico-de-transferencias/create-arquivos/create-arquivos.component';
import { DeleteArquivosComponent } from './components/historico-de-transferencias/delete-arquivos/delete-arquivos.component';
import { MovimentacoesComponent } from './components/movimentacoes/movimentacoes.component';
import { FiltroComponent } from './components/movimentacoes/filtro/filtro.component';


@NgModule({
	declarations: [
		ListArquivosComponent,
		EditArquivosComponent,
		CreateArquivosComponent,
		DeleteArquivosComponent,
		IcmComponent,
  		MovimentacoesComponent,
    FiltroComponent
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
		DatePipe,
		Crypto
	]
})
export class ICMModule { }
