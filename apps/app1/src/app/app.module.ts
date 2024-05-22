import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Home2Component } from './home2/home2.component';
import { RouteReuseStrategy } from '@angular/router';
import { DefaultLayoutComponent } from './default/default-layout.component';
import { CustomReuseStrategy } from 'src/cms/RouteReuseStrategy';

@NgModule({
  declarations: [
    DefaultLayoutComponent,
    AppComponent,
    HomeComponent,
    Home2Component,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
