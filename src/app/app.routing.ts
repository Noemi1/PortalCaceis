import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './helpers/auth.guard';
import { RoleGuard } from './helpers/role.guard';
import { Role } from './models';
import { HomeComponent } from './parts/home/home.component';

const account = () =>import('./modules/account/account.module').then(x => x.AccountModule)
const perfil = () =>import('./modules/perfil/perfil.module').then(x => x.PerfilModule)
const jud = () =>import('./sistemas/jud/jud.module').then(x => x.JudModule)
const icm = () =>import('./sistemas/icm/icm.module').then(x => x.ICMModule)

const routes: Routes = [
	{
		path: '', 
		component: HomeComponent, 
		canActivate: [AuthGuard], 
		canActivateChild: [RoleGuard], 
		data: {roles:  [ Role.Corp, Role.JUD, Role.ICM]}, 
		children: [
			{ path: 'jud', loadChildren: jud, canActivateChild: [RoleGuard], data: {roles:  [Role.JUD]} },
			{ path: 'icm', loadChildren: icm, canActivateChild: [RoleGuard], data: {roles:  [Role.ICM]} },
			{ path: 'corp', canActivate: [AuthGuard, RoleGuard], data: { roles: [Role.Corp] }, children: [
				{ path: 'perfil', loadChildren: perfil }
			] },
		]
	},
	{ path: 'account', loadChildren: account },
	
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
