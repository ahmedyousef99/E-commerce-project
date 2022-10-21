import { BEData } from './../../shared/models/be-data.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
