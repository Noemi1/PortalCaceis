import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AccountRoutingModule } from './account.routing';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AccountComponent } from './account.component';
import { SenhaAlertModule } from 'src/app/parts/senha-alert/senha-alert.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
	declarations: [
		LoginComponent,
		ResetPasswordComponent,
		AccountComponent,
		ForgotPasswordComponent
	],
	imports: [
		CommonModule,
		AccountRoutingModule,
		FormsModule,
		SenhaAlertModule,
		FontAwesomeModule,
	],
	bootstrap: [AccountComponent]
})
export class AccountModule { }
