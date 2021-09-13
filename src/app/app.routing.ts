import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './parts/home/home.component';

const account = () =>import('./modules/account/account.module').then(x => x.AccountModule)
const openFinance = () =>import('./sistemas/open-finance/open-finance.module').then(x => x.OpenFinanceModule)
const jud = () =>import('./sistemas/jud/jud.module').then(x => x.JudModule)

const routes: Routes = [
	{ path: '', component: HomeComponent, children: [
		{ path: 'open-finance', loadChildren: openFinance },
		{ path: 'jud', loadChildren: jud },
	], /**redirectTo: 'portal', pathMatch: 'full' */ },
	{ path: 'account', loadChildren: account },
	
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
