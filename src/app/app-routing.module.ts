import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProviderProductsListComponent } from './components/provider-products-list/provider-products-list.component';
import { ProvidersListComponent } from './components/providers-list/providers-list.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { TopProvidersComponent } from './components/top-providers/top-providers.component';
import { MembersPageComponent } from './components/members-page/members-page.component';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
}  from '@okta/okta-angular';

import { OktaLoginComponent } from './components/okta-login/okta-login.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';


const routes: Routes = [
  { path: '', redirectTo: '/top-providers', pathMatch: 'full' },
  { path: 'top-providers', component: TopProvidersComponent },
  { path: 'providers', component: ProvidersListComponent },
  { path: 'search/:keyword', component: ProvidersListComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: OktaLoginComponent },
  { path: 'members', component: MembersPageComponent, canActivate: [ OktaAuthGuard ] },
  { path: 'order-history', component: OrderHistoryComponent, canActivate: [ OktaAuthGuard ] },
  { path: 'provider-products/:providerId', component: ProviderProductsListComponent },
  { path: 'provider-products/:providerId/:id', component: ProductDetailsComponent},
  { path: 'about-us', component: AboutUsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
