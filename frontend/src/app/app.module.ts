import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './componenets/product-list/product-list.component';
import { ProudctItemComponent } from './componenets/proudct-item/proudct-item.component';
import { ProductItemDetailComponent } from './componenets/product-item-detail/product-item-detail.component';
import { CartComponent } from './componenets/cart/cart.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationComponent } from './componenets/confirmation/confirmation.component';
import { UserLoginComponent } from './componenets/user-login/user-login.component';
import { UserRegistrationComponent } from './componenets/user-registration/user-registration.component';
import { LandingPageComponent } from './componenets/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    ProudctItemComponent,
    ProductItemDetailComponent,
    CartComponent,
    ConfirmationComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
