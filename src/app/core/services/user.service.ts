import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../../../const/const';
import { Observable } from 'rxjs';
import { Product, UserProductRs, UserRs } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Get user profile
  getUserProfile(): Observable<UserRs> {
    return this.http.get<UserRs>(`${constant.baseurl}${constant.endPoints.profile}`);
  }

  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${constant.baseurl}${constant.endPoints.products}`);
  }

  // Add a product to favorites
  addProductToFavorites(productId: number): Observable<any> {
    return this.http.post<any>(`${constant.baseurl}${constant.endPoints.addProduct}`, productId );
  }

  // Get favorite products
  getFavoriteProducts(): Observable<UserProductRs[]> {
    return this.http.get<UserProductRs[]>(`${constant.baseurl}${constant.endPoints.getFavoritesProducts}`);
  }

  // Delete a product from favorites
  deleteFromFavorites(productId: number): Observable<any> {
    return this.http.post<any>(`${constant.baseurl}${constant.endPoints.deleteFromFavorites}`, productId );
  }

  // Save a product to the favorite list
  saveProductToFavorites(productId: number): Observable<any> {
    return this.http.post<any>(`${constant.baseurl}${constant.endPoints.addSaveFavoriteList}`, productId );
  }

}
