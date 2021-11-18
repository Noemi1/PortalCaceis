import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParamGuard } from 'src/app/helpers/param.guard';
import { UsuarioStatusGuard } from 'src/app/helpers/usuario-status.guard';
import { CreateComponent } from './components/perfil/create/create.component';
import { DeleteComponent } from './components/perfil/delete/delete.component';
import { EditComponent } from './components/perfil/edit/edit.component';
import { ListComponent } from './components/perfil/list/list.component';
import { AtivacaoComponent } from './components/usuarios/ativacao/ativacao.component';
import { CreateUsuariosComponent } from './components/usuarios/create-usuarios/create-usuarios.component';
import { DeleteUsuariosComponent } from './components/usuarios/delete-usuarios/delete-usuarios.component';
import { EditUsuariosComponent } from './components/usuarios/edit-usuarios/edit-usuarios.component';
import { FiltrarUsuariosComponent } from './components/usuarios/filtrar-usuarios/filtrar-usuarios.component';
import { ListUsuariosComponent } from './components/usuarios/list-usuarios/list-usuarios.component';
import { ResetPasswordComponent } from './components/usuarios/reset-password/reset-password.component';

const routes: Routes = [
	{
		path: 'perfil', component: ListComponent, children: [
			{ path: 'cadastrar', component: CreateComponent },
			{ path: 'editar', component: EditComponent, canActivate: [ParamGuard], data: { params: ['id'], returnUrl: '/corp/perfil' } },
			// { path: 'excluir', component: DeleteComponent, canActivate: [ParamGuard], data: { params: ['id'], returnUrl: '/corp/perfil' }  }
		]
	},
	{ path: 'accounts', component: ListUsuariosComponent, children: [
		{ path: 'cadastrar', component: CreateUsuariosComponent },
		{ path: 'editar', component: EditUsuariosComponent, canActivate: [ParamGuard], data: { params: ['id'], returnUrl: '/corp/accounts' }  },
		{ path: 'ativar', component: AtivacaoComponent, canActivate: [UsuarioStatusGuard, ParamGuard], data: { params: ['id'], returnUrl: '/corp/accounts' }  },
		{ path: 'desativar', component: AtivacaoComponent, canActivate: [UsuarioStatusGuard, ParamGuard], data: { params: ['id'], returnUrl: '/corp/accounts' }  },
		{ path: 'reset-password', component: ResetPasswordComponent, canActivate: [ParamGuard], data: { params: ['id'], returnUrl: '/corp/accounts' }  },
		// { path: 'excluir', component: DeleteUsuariosComponent, canActivate: [ParamGuard], data: { params: ['id'], returnUrl: '/corp/accounts' }  },
		{ path: 'filtrar', component: FiltrarUsuariosComponent },
	] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CorpRoutingModule { }
