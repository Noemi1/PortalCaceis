import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArquivosComponent } from './components/historico-de-transferencias/create-arquivos/create-arquivos.component';
import { DeleteArquivosComponent } from './components/historico-de-transferencias/delete-arquivos/delete-arquivos.component';
import { EditArquivosComponent } from './components/historico-de-transferencias/edit-arquivos/edit-arquivos.component';
import { IcmComponent } from './components/icm.component';
import { ListArquivosComponent } from './components/historico-de-transferencias/list-arquivos/list-arquivos.component';
import { MovimentacoesComponent } from './components/movimentacoes/movimentacoes.component';

const routes: Routes = [
	{ path: '', redirectTo: 'historico-de-transferencia' },
	{ path: 'historico-de-transferencia', component:  ListArquivosComponent, children: [
		{ path: 'cadastrar', component: CreateArquivosComponent },
		{ path: 'editar', component: EditArquivosComponent },
		{ path: 'excluir', component: DeleteArquivosComponent }
	]},
	{ path: 'movimentacoes', component: MovimentacoesComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ICMRoutingModule { }
