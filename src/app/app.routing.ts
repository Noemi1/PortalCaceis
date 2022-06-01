import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { RoleGuard } from './helpers/role.guard';
import { Role } from './models/role.model';
import { HomeComponent } from './parts/home/home.component';

const account = () =>import('./modules/account/account.module').then(x => x.AccountModule);
const jud = () =>import('./sistemas/jud/jud.module').then(x => x.JudModule);
const cloudTransfer = () =>import('./sistemas/cloud-transfer/cloud-transfer.module').then(x => x.CloudTransferModule);
const corp = () =>import('./sistemas/corp/corp.module').then(x => x.CorpModule);

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivate: [AuthGuard],
		canActivateChild: [RoleGuard],
		data: {roles:  [ Role.Corp, Role.JUD, Role.ICM]},
		children: [
			{ path: 'jud', loadChildren: jud, canActivate: [RoleGuard], data: {roles:  [Role.JUD]} },
			{ path: 'icm', loadChildren: cloudTransfer, canActivate: [RoleGuard], data: {roles:  [Role.ICM]} },
			{ path: 'corp', loadChildren: corp, canActivate: [RoleGuard], data: {roles:  [Role.Corp]} },
		]
	},
	{ path: 'account', loadChildren: account },

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
