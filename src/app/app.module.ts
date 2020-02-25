import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SonComponent } from './components/son/son.component';
import { ShoppingCarDetailComponent } from './components/shopping-car-detail/shopping-car-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SonComponent,
    ShoppingCarDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
