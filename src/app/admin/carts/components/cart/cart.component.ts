import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddNewCart } from 'src/app/shared/models/add-new-cart.model';
import { CartProducts } from 'src/app/shared/models/cart-products.model';
import { SendProducts } from 'src/app/shared/models/send-products.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  carts: AddNewCart[] = [];
  total: any = 0;
  n: any;
  sent: boolean = false;
  form: FormGroup;

  constructor(private cartService: CartService, private builder: FormBuilder) {}

  ngOnInit(): void {
    this.getcarts();
    this.form = this.builder.group({
      start: [``],
      end: [``],
    });
  }

  getcarts(): void {
    this.cartService.getCarts().subscribe((res) => {
      this.carts = res;
    });
  }
  deleteCart(i: number): void {
    this.deleteCarts(i);
    this.getcarts();
  }
  deleteCarts(id: number): void {
    this.cartService.deleteCart(id).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  apply(): void {
    console.log(this.form.value);
    let date = {
      start: this.form.get(`start`).value,
      end: this.form.get(`end`).value,
    };

    this.cartService.getCartsInRange(date).subscribe((res) => {
      this.carts = res;
    });
  }
}
