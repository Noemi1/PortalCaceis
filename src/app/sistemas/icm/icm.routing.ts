import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IcmComponent } from './icm.component';
import { ListArquivosComponent } from './list-arquivos/list-arquivos.component';

const routes: Routes = [
	{ path: '', component: IcmComponent },
	{ path: 'gestao-de-arquivos', component:  ListArquivosComponent}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ICMRoutingModule { }
