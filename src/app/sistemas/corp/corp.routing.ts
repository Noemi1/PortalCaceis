import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/perfil/create/create.component';
import { DeleteComponent } from './components/perfil/delete/delete.component';
import { EditComponent } from './components/perfil/edit/edit.component';
import { ListComponent } from './components/perfil/list/list.component';

const routes: Routes = [
	{
		path: 'perfil', component: ListComponent, children: [
			{ path: 'cadastrar', component: CreateComponent },
			{ path: 'editar', component: EditComponent },
			// { path: 'excluir', component: DeleteComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CorpRoutingModule { }
