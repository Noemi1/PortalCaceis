import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArquivosComponent } from './components/historico-de-transferencias/create-arquivos/create-arquivos.component';
import { DeleteArquivosComponent } from './components/historico-de-transferencias/delete-arquivos/delete-arquivos.component';
import { EditArquivosComponent } from './components/historico-de-transferencias/edit-arquivos/edit-arquivos.component';
import { ListArquivosComponent } from './components/historico-de-transferencias/list-arquivos/list-arquivos.component';
import { MovimentacoesComponent } from './components/movimentacoes/movimentacoes.component';
import { FiltroComponent } from './components/movimentacoes/filtro/filtro.component';

const routes: Routes = [
	{ path: '', redirectTo: 'arquivos' },
	{ path: 'arquivos', component:  ListArquivosComponent, children: [
		{ path: 'cadastrar', component: CreateArquivosComponent },
		{ path: 'editar', component: EditArquivosComponent },
		{ path: 'excluir', component: DeleteArquivosComponent }
	]},
	{ path: 'historico-de-movimentacoes', component: MovimentacoesComponent, children: [
		{ path: 'filtrar', component: FiltroComponent }
	] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ICMRoutingModule { }
