import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './componenets/cart/cart.component';
import { ConfirmationComponent } from './componenets/confirmation/confirmation.component';
import { LandingPageComponent } from './componenets/landing-page/landing-page.component';
import { ProductItemDetailComponent } from './componenets/product-item-detail/product-item-detail.component';
import { ProductListComponent } from './componenets/product-list/product-list.component';
import { UserLoginComponent } from './componenets/user-login/user-login.component';
import { UserRegistrationComponent } from './componenets/user-registration/user-registration.component';

const routes: Routes = [
  {path: "products", component: ProductListComponent},
  {path: "", component: LandingPageComponent},
  {path: "products/:id", component: ProductItemDetailComponent},
  {path: "cart", component: CartComponent},
  {path: "confirmation", component: ConfirmationComponent},
  {path: "login", component: UserLoginComponent},
  {path: "register", component: UserRegistrationComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
