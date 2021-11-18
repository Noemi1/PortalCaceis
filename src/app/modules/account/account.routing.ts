import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/helpers/auth.guard';
import { ParamGuard } from 'src/app/helpers/param.guard';
import { AccountComponent } from './account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
	{ path: '', redirectTo: 'acessar', },
	{
		path: '', component: AccountComponent, children: [
			{ path: 'acessar', component: LoginComponent },
			{ path: 'forgot-password', component: ForgotPasswordComponent },
			{ path: 'reset-password', component: ResetPasswordComponent, canActivate: [ParamGuard], data: { params: ['token'], returnUrl: '/account/acessar' }},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AccountRoutingModule { }
