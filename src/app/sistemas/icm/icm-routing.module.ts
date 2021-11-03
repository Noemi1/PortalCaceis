import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListArquivosComponent } from 'src/app/list-arquivos/list-arquivos.component';

const routes: Routes = [
	{ path: '', redirectTo: 'gestao-de-arquivos' },
	{ path: 'gestao-de-arquivos', component: ListArquivosComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ICMRoutingModule { }
