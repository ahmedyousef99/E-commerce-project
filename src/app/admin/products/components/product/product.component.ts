import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BEData } from 'src/app/shared/models/be-data.model';
import { CartProducts } from 'src/app/shared/models/cart-products.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() data: BEData;
  @Output() item: EventEmitter<CartProducts> = new EventEmitter<CartProducts>();
  IsAddActive: boolean = false;
  amount: number = 1;
  constructor() {}

  ngOnInit(): void {}
  add() {
    this.item.emit({ product: this.data, quantity: this.amount });
  }
}
