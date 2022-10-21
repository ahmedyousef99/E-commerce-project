import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddNewCart } from 'src/app/shared/models/add-new-cart.model';
import { environment } from 'src/environments/environment';

export interface RangTime {
  start: string;
  end: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseApi: string = environment.apiLink;

  constructor(private http: HttpClient) {}

  getCarts(): Observable<AddNewCart[]> {
    // let params = new HttpParams();
    // params = params
    //   .append(`startdate`, date?.start)
    //   .append(`enddate`, date?.end);
    return this.http.get<AddNewCart[]>(this.baseApi + `carts`);
  }
  deleteCart(id: number): Observable<any> {
    return this.http.delete(this.baseApi + `carts/` + id);
  }
  getCartsInRange(date: RangTime): Observable<any> {
    let params = new HttpParams();
    params = params
      .append(`startdate`, date?.start)
      .append(`enddate`, date?.end);
    return this.http.get<any>(this.baseApi + `carts`, {
      params: params,
    });
  }
}
