import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from '../shared/guard/authguard.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: ``,
    pathMatch: `full`,
    component: HomeComponent,
  },
  {
    path: `product-admin`,
    loadChildren: () =>
      import(`./products/products.module`).then((m) => m.ProductsModule),
    canActivate: [AuthguardGuard],
    data: { permission: `admin.product`, role: `admin` },
  },
  {
    path: `cart-admin`,
    loadChildren: () =>
      import(`./carts/carts.module`).then((m) => m.CartsModule),
    canActivate: [AuthguardGuard],
    data: { permission: `admin.cart`, role: `admin` },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
