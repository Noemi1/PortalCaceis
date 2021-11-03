import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing';
import { FooterComponent } from './parts/footer/footer.component';
import { HeaderComponent } from './parts/header/header.component';
import { HomeComponent } from './parts/home/home.component';
import { MenuLateralComponent } from './parts/menu/menu.component';
import { AlertComponent } from './parts/alert/alert.component';
import {MenuModule} from 'primeng/menu';
import {MegaMenuModule} from 'primeng/megamenu';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
