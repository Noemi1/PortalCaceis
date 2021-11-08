import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
	{ path: '', redirectTo: 'acessar', },
	{
		path: '', component: AccountComponent, children: [
			{ path: 'acessar', component: LoginComponent },
			{ path: 'registrar', component: RegisterComponent },
			{ path: 'esqueci-minha-senha', component: ForgotPasswordComponent },
			{ path: 'resetar-senha', component: ResetPasswordComponent },
			// { path: 'perfil', component: ProfileComponent },
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AccountRoutingModule { }
