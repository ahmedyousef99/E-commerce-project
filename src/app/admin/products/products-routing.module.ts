import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

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
    path: `all-products/add-products`,

    component: AddProductComponent,
  },
  {
    path: `all-products/update-products/:id`,

    component: UpdateProductComponent,
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
