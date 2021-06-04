import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/login/login.component';
import { ProviderProductsListComponent } from './components/provider-products-list/provider-products-list.component';
import { ProvidersListComponent } from './components/providers-list/providers-list.component';
import { TopProvidersComponent } from './components/top-providers/top-providers.component';

const routes: Routes = [
  { path: '', redirectTo: '/top-providers', pathMatch: 'full' },
  { path: 'top-providers', component: TopProvidersComponent },
  { path: 'providers', component: ProvidersListComponent },
  { path: 'search/:keyword', component: ProvidersListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'provider-products/:providerId', component: ProviderProductsListComponent },
  { path: 'about-us', component: AboutUsComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
