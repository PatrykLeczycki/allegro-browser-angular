import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app.routing';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {AuthComponent} from './auth/auth.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AllegroAuthComponent} from './allegro/auth/auth.component';
import { BrowserComponent } from './allegro/browser/browser.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {AllegroAuthInterceptorService} from './allegro/auth/allegro-auth-interceptor.service';

@NgModule({
  declarations: [
    AllegroAuthComponent,
    AppComponent,
    AuthComponent,
    DashboardComponent,
    HeaderComponent,
    HomeComponent,
    BrowserComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AllegroAuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
