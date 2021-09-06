import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './parts/home/home.component';
import { InitialComponent } from './parts/initial/initial.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, children: [
		{ path: '', component: InitialComponent },
	] },
	
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
