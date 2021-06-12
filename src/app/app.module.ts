import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopProvidersComponent } from './components/top-providers/top-providers.component';
import { ProvidersListComponent } from './components/providers-list/providers-list.component';
import { SearchComponent } from './components/search/search.component';
import { ProviderProductsListComponent } from './components/provider-products-list/provider-products-list.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { SmallHeaderComponent } from './components/small-header/small-header.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OktaLoginComponent } from './components/okta-login/okta-login.component';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { ProductService } from './shared/services/product.service';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import myAppConfig from './config/my-app-config';
import { Router } from '@angular/router';
import { MembersPageComponent } from './components/members-page/members-page.component';


const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth, injector) => {
    const router = injector.get(Router);

    router.navigate(['/okta-login'])
  }
}, myAppConfig.oidc);

@NgModule({
  declarations: [
    AppComponent,
    TopProvidersComponent,
    ProvidersListComponent,
    SearchComponent,
    ProviderProductsListComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    RegisterComponent,
    ShoppingCartComponent,
    CartStatusComponent,
    SmallHeaderComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    OktaLoginComponent,
    LoginStatusComponent,
    MembersPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ { provide: OKTA_CONFIG, useValue: oktaConfig } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
