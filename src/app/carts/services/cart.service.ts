import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddNewCart } from 'src/app/shared/models/add-new-cart.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseApi: string = environment.apiLink;

  constructor(private http: HttpClient) {}

  addNewProduct(newCart: AddNewCart): Observable<AddNewCart> {
    return this.http.post<AddNewCart>(`${this.baseApi}carts`, newCart);
  }
}
