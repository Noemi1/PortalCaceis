import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AccountComponent } from './account.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
  ],
  bootstrap: [AccountComponent]
})
export class AccountModule { }
