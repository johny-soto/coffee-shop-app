import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: 'shop', loadChildren: () => import('./feature/coffee-shop/coffee-shop.module').then(mod => mod.CoffeeShopModule) },
  { path: 'producto', loadChildren: () => import('@producto/producto.module').then(mod => mod.ProductoModule) },
  {
    path: 'coffee-management', loadChildren: () =>
      import('./feature/coffee-management/coffee-management.module')
      .then(mod => mod.CoffeeManagementModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
