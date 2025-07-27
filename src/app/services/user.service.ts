import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../../const/const';
import { Observable } from 'rxjs';
import { Product, UserProductRs, UserRs } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<UserRs> {
    return this.http.get<UserRs>(`${constant.baseurl}${constant.endPoints.profile}`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${constant.baseurl}${constant.endPoints.products}`);
  }

  addProductToFavorites(productId: number): Observable<any> {
    return this.http.post<any>(`${constant.baseurl}${constant.endPoints.addProduct}`, productId );
  }

  getFavoriteProducts(): Observable<UserProductRs[]> {
    return this.http.get<UserProductRs[]>(`${constant.baseurl}${constant.endPoints.getFavoritesProducts}`);
  }

}
