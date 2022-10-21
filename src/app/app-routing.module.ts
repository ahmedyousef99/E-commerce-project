import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './shared/guard/authguard.guard';

const routes: Routes = [
  {
    path: ``,
    loadChildren: () =>
      import(`./public/public.module`).then((m) => m.PublicModule),
  },
  {
    path: `public`,
    loadChildren: () =>
      import(`./public/public.module`).then((m) => m.PublicModule),
  },
  {
    path: `product`,
    loadChildren: () =>
      import(`./products/products.module`).then((m) => m.ProductsModule),
    canActivate: [AuthguardGuard],
    data: { permission: `user.products`, role: `user` },
  },
  {
    path: `cart`,
    loadChildren: () =>
      import(`./carts/carts.module`).then((m) => m.CartsModule),
    canActivate: [AuthguardGuard],
    data: { permission: `user.products`, role: `user` },
  },
  {
    path: `admin`,
    loadChildren: () =>
      import(`./admin/admin.module`).then((m) => m.AdminModule),
    canActivate: [AuthguardGuard],
    data: { permission: `admin.product`, role: `admin` },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
