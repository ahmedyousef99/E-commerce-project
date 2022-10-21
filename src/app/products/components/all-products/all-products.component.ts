import { CartProducts } from './../../../shared/models/cart-products.model';
import { BEData } from './../../../shared/models/be-data.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  constructor(private productService: ProductService) {}
  listOfProduct: BEData[] = [];
  categories: string[] = [];
  cartsInlocal: CartProducts[] = [];
  activeSpinner: boolean = false;

  ngOnInit(): void {
    this.getAllProducts();
    this.getCategories();
  }

  getAllProducts(): void {
    this.activeSpinner = true;
    this.productService.getAllProduct().subscribe((res) => {
      this.listOfProduct = res;
      this.activeSpinner = false;
    });
  }

  getCategories(): void {
    this.activeSpinner = true;

    this.productService.getAllCategories().subscribe(
      (res) => {
        this.categories = res;
        this.activeSpinner = false;
      },
      (error) => {
        alert(error);
      }
    );
  }

  onSelected(value: any): void {
    let selectedCategory: string = value.target.value;
    if (selectedCategory == 'all') {
      this.getAllProducts();
    } else {
      this.getSpecificDataFromCategory(selectedCategory);
    }
  }
  getSpecificDataFromCategory(category: string): void {
    this.activeSpinner = true;

    this.productService.getSpecificCategory(category).subscribe((res) => {
      this.listOfProduct = res;
      this.activeSpinner = false;
    });
  }

  addToCart(product: CartProducts): void {
    if ('cart' in localStorage) {
      this.cartsInlocal = JSON.parse(localStorage.getItem('cart'));
      let exist = this.cartsInlocal.find(
        (item) => item.product.id === product.product.id
      );
      if (exist) {
        alert(`this item in your cart `);
      } else {
        this.cartsInlocal.push(product);
        localStorage.setItem('cart', JSON.stringify(this.cartsInlocal));
      }
    } else {
      this.cartsInlocal.push(product);
      localStorage.setItem('cart', JSON.stringify(this.cartsInlocal));
    }
  }
}
