import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from '../shared/guard/authguard.guard';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  {
    path: ``,
    pathMatch: `full`,
    redirectTo: `all-products`,
  },
  {
    path: `all-products`,
    component: AllProductsComponent,
  },
  {
    path: `product-details/:id`,
    component: ProductDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
