import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AccountComponent } from './account.component';
import { FormsModule } from '@angular/forms';
import { SenhaAlertModule } from 'src/app/parts/senha-alert/senha-alert.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ProfileComponent } from './profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
		ResetPasswordComponent,
		AccountComponent,
		VerifyEmailComponent,
		ProfileComponent
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
