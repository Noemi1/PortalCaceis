import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/perfil/create/create.component';
import { DeleteComponent } from './components/perfil/delete/delete.component';
import { EditComponent } from './components/perfil/edit/edit.component';
import { ListComponent } from './components/perfil/list/list.component';
import { CreateUsuariosComponent } from './components/usuarios/create-usuarios/create-usuarios.component';
import { DeleteUsuariosComponent } from './components/usuarios/delete-usuarios/delete-usuarios.component';
import { EditUsuariosComponent } from './components/usuarios/edit-usuarios/edit-usuarios.component';
import { FiltrarUsuariosComponent } from './components/usuarios/filtrar-usuarios/filtrar-usuarios.component';
import { ListUsuariosComponent } from './components/usuarios/list-usuarios/list-usuarios.component';

const routes: Routes = [
	{
		path: 'perfil', component: ListComponent, children: [
			{ path: 'cadastrar', component: CreateComponent },
			{ path: 'editar', component: EditComponent },
			// { path: 'excluir', component: DeleteComponent }
		]
	},
	{ path: 'accounts', component: ListUsuariosComponent, children: [
		{ path: 'cadastrar', component: CreateUsuariosComponent },
		{ path: 'editar', component: EditUsuariosComponent },
		{ path: 'excluir', component: DeleteUsuariosComponent },
		{ path: 'filtrar', component: FiltrarUsuariosComponent },
	] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CorpRoutingModule { }
