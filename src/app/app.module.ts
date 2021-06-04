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
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
