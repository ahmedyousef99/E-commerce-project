import { SendProducts } from './../../../shared/models/send-products.model';
import { CartProducts } from './../../../shared/models/cart-products.model';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AddNewCart } from 'src/app/shared/models/add-new-cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartsInlocal: CartProducts[] = [];
  total: any = 0;
  n: any;
  sent: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  clearCart(): void {
    localStorage.removeItem(`cart`);
    this.getCartProducts();
    this.getTotalPrice();
  }

  getCartProducts(): void {
    if ('cart' in localStorage) {
      this.cartsInlocal = JSON.parse(localStorage.getItem('cart'));
    } else {
      this.cartsInlocal = [];
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = 0;
    for (let i in this.cartsInlocal) {
      this.total +=
        this.cartsInlocal[i].product.price * this.cartsInlocal[i].quantity;
    }
  }
  addAmount(i: number): void {
    this.cartsInlocal[i].quantity++;
    localStorage.setItem(`cart`, JSON.stringify(this.cartsInlocal));
    this.getTotalPrice();
  }
  minsAmount(i: number): void {
    if (this.cartsInlocal[i].quantity > 0) {
      this.cartsInlocal[i].quantity--;
      localStorage.setItem(`cart`, JSON.stringify(this.cartsInlocal));
      this.getTotalPrice();
    }
  }
  saveInLoacl(): void {
    localStorage.setItem(`cart`, JSON.stringify(this.cartsInlocal));
    this.getTotalPrice();
  }
  onDelete(i: number): void {
    console.log(i);
    this.cartsInlocal.splice(i, 1);
    localStorage.setItem(`cart`, JSON.stringify(this.cartsInlocal));
    this.getTotalPrice();
  }
  onClickClear(): void {
    this.cartsInlocal = [];
    localStorage.setItem(`cart`, JSON.stringify(this.cartsInlocal));
    this.getTotalPrice();
  }
  onOrder(): void {
    let products: SendProducts[] = this.cartsInlocal.map((e: CartProducts) => {
      return { productId: e.product.id, quantity: e.quantity };
    });
    let cartsTosend: AddNewCart = {
      userId: 2,
      date: new Date(),
      products: products,
    };

    this.cartService.addNewProduct(cartsTosend).subscribe(
      (res) => {
        this.sent = true;
        this.clearCart();
        setTimeout(() => {
          this.sent = false;
        }, 2000);
        console.log(res);
      },
      (eror) => {
        console.log(eror, `sss`);
      }
    );
  }
}
