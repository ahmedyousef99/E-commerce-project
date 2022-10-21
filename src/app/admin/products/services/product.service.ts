import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BEData } from 'src/app/shared/models/be-data.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiLinkProducts: string = `${environment.apiLink}products`;
  constructor(private http: HttpClient) {}
  getAllProduct(): Observable<BEData[]> {
    return this.http.get<BEData[]>(this.apiLinkProducts);
  }
  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiLinkProducts}/categories`);
  }

  getSpecificCategory(category: string): Observable<BEData[]> {
    return this.http.get<BEData[]>(
      `${this.apiLinkProducts}/category/${category}`
    );
  }
  getProductDetails(id: any): Observable<BEData> {
    return this.http.get<BEData>(`${this.apiLinkProducts}/${id}`);
  }
  addNewProduct(product: any): Observable<any> {
    return this.http.post<any>('https://fakestoreapi.com/products', product);
  }
}
