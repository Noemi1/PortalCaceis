import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwPaginationModule } from 'jw-angular-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TableModule } from 'primeng/table';

import { CloudTransferRoutingModule } from './cloud-transfer.routing';
import { IcmComponent } from './components/icm.component';
import { ArquivosService } from './services/arquivos.service';
import { FiltroComponent } from './components/movimentacoes/filtro/filtro.component';
import { MovimentacoesComponent } from './components/movimentacoes/movimentacoes.component';
import { ListArquivosComponent } from './components/arquivos/list-arquivos/list-arquivos.component';
import { EditArquivosComponent } from './components/arquivos/edit-arquivos/edit-arquivos.component';
import { CreateArquivosComponent } from './components/arquivos/create-arquivos/create-arquivos.component';
import { DeleteArquivosComponent } from './components/arquivos/delete-arquivos/delete-arquivos.component';
import { FiltroArquivosComponent } from './components/arquivos/filtro-arquivos/filtro-arquivos.component';


@NgModule({
	declarations: [
		ListArquivosComponent,
		EditArquivosComponent,
		CreateArquivosComponent,
		DeleteArquivosComponent,
		FiltroArquivosComponent,
		IcmComponent,
    MovimentacoesComponent,
    FiltroComponent
	],
	imports: [
		CommonModule,
		CloudTransferRoutingModule,
		FontAwesomeModule,
		JwPaginationModule,
		FormsModule,
    TableModule
	],
	providers: [
		ArquivosService,
		DatePipe,
		Crypto
	]
})
export class CloudTransferModule { }
