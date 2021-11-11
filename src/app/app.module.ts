import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing';
import { FooterComponent } from './parts/footer/footer.component';
import { HomeComponent } from './parts/home/home.component';
import { MenuLateralComponent } from './parts/menu/menu.component';
import { AlertComponent } from './parts/alert/alert.component';
import { MenuModule } from 'primeng/menu';
import { MegaMenuModule } from 'primeng/megamenu';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Crypto } from './utils/cryptojs';
import { Format } from './utils/format';
import { Password } from './utils';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Inputsearch } from './utils/search-input';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,
		FooterComponent,
		MenuLateralComponent,
		HomeComponent,
		AlertComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		FontAwesomeModule,
		MenuModule,
		MegaMenuModule,
		ToastrModule.forRoot(),
		HttpClientModule,
		FormsModule,
		NgbModule
	],
	providers: [
		Crypto,
		Format,
		Password,
		Inputsearch,
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
