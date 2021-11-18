import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArquivosComponent } from './components/arquivos/create-arquivos/create-arquivos.component';
import { DeleteArquivosComponent } from './components/arquivos/delete-arquivos/delete-arquivos.component';
import { EditArquivosComponent } from './components/arquivos/edit-arquivos/edit-arquivos.component';
import { ListArquivosComponent } from './components/arquivos/list-arquivos/list-arquivos.component';
import { MovimentacoesComponent } from './components/movimentacoes/movimentacoes.component';
import { FiltroComponent } from './components/movimentacoes/filtro/filtro.component';
import { FiltroArquivosComponent } from './components/arquivos/filtro-arquivos/filtro-arquivos.component';
import { ParamGuard } from 'src/app/helpers/param.guard';

const routes: Routes = [
	{ path: '', redirectTo: 'arquivos' },
	{ path: 'arquivos', component:  ListArquivosComponent, children: [
		{ path: 'cadastrar', component: CreateArquivosComponent },
		{ path: 'editar', component: EditArquivosComponent, canActivate: [ParamGuard], data: { params: ['id'], returnUrl: '/icm/arquivos' } },
		{ path: 'excluir', component: DeleteArquivosComponent, canActivate: [ParamGuard], data: { params: ['id'], returnUrl: '/icm/arquivos' } },
		{ path: 'filtrar', component: FiltroArquivosComponent },
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
