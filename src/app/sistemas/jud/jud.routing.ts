import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParamGuard } from 'src/app/helpers/param.guard';
import { CreateComponent } from './ordem-judicial/create/create.component';
import { DeleteComponent } from './ordem-judicial/delete/delete.component';
import { EditComponent } from './ordem-judicial/edit/edit.component';
import { FilterComponent } from './ordem-judicial/filter/filter.component';
import { ListComponent } from './ordem-judicial/list/list.component';

const routes: Routes = [
	{ path: 'ordem-judicial', component: ListComponent, children: [
		{ path: 'cadastrar', component: CreateComponent },
		{ path: 'editar', component: EditComponent, canActivate: [ParamGuard], data: { params: ['id'], returnUrl: '/jud/ordem-judicial' } },
		{ path: 'excluir', component: DeleteComponent, canActivate: [ParamGuard], data: { params: ['id'], returnUrl: '/jud/ordem-judicial' } },
		{ path: 'filtrar', component: FilterComponent },
	] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class JudRoutingModule { }
