import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/helpers/auth.guard';
import { AccountComponent } from './account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
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
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AccountRoutingModule { }
