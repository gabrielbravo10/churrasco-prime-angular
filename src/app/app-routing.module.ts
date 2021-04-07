import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvidersListComponent } from './components/providers-list/providers-list.component';
import { TopProvidersComponent } from './components/top-providers/top-providers.component';


const routes: Routes = [
  { path: '', redirectTo: '/top-providers', pathMatch: 'full' },
  { path: 'top-providers', component: TopProvidersComponent },
  { path: 'providers', component: ProvidersListComponent },
  // { path: 'cart-details', component: CartDetailsComponent },
  // { path: 'products/:id', component: ProductDetailsComponent },
  // { path: 'search/:keyword', component: ProductListComponent },
  // { path: 'category/:id', component: ProductListComponent },
  // { path: 'category', component: ProductListComponent },
  // { path: 'products', component: ProductListComponent },
  // { path: '', redirectTo: '/products', pathMatch: 'full' },
  // { path: '**', redirectTo: '/products', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
