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

@NgModule({
  declarations: [
    AppComponent,
    TopProvidersComponent,
    ProvidersListComponent,
    SearchComponent,
    ProviderProductsListComponent
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
