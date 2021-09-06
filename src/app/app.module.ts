import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { FooterComponent } from './parts/footer/footer.component';
import { HeaderComponent } from './parts/header/header.component';
import { HomeComponent } from './parts/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InitialComponent } from './parts/initial/initial.component';
import { MenuLateralComponent } from './parts/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    InitialComponent,
    MenuLateralComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
