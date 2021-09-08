import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const root = () =>import('./sistemas/portal-caceis/portal-caceis.module').then(x => x.PortalCaceisModule)
const openFinance = () =>import('./sistemas/open-finance/open-finance.module').then(x => x.OpenFinanceModule)

const routes: Routes = [
	{ path: '', redirectTo: 'portal', pathMatch: 'full' },
	{ path: 'portal', loadChildren: root },
	{ path: 'open-finance', loadChildren: openFinance },
	
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
