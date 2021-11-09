import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArquivosComponent } from './components/create-arquivos/create-arquivos.component';
import { DeleteArquivosComponent } from './components/delete-arquivos/delete-arquivos.component';
import { EditArquivosComponent } from './components/edit-arquivos/edit-arquivos.component';
import { IcmComponent } from './components/icm.component';
import { ListArquivosComponent } from './components/list-arquivos/list-arquivos.component';

const routes: Routes = [
	{ path: '', redirectTo: 'historico-de-transferencia' },
	{ path: 'historico-de-transferencia', component:  ListArquivosComponent, children: [
		{ path: 'cadastrar', component: CreateArquivosComponent },
		{ path: 'editar', component: EditArquivosComponent },
		{ path: 'excluir', component: DeleteArquivosComponent }
	]}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ICMRoutingModule { }
