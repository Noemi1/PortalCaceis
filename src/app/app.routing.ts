import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from './parts/home/home.component';

const account = () =>import('./modules/account/account.module').then(x => x.AccountModule)
const jud = () =>import('./sistemas/jud/jud.module').then(x => x.JudModule)
const icm = () =>import('./sistemas/icm/icm.module').then(x => x.ICMModule)

const routes: Routes = [
	{ path: '', component: HomeComponent, canActivate: [AuthGuard], /**/ children: [
		{ path: 'jud', loadChildren: jud },
		{ path: 'cloud-transfer', loadChildren: icm },
	], /**redirectTo: 'portal', pathMatch: 'full' */ },
	{ path: 'account', loadChildren: account },
	
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
