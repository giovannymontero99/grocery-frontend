import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../const/enviroments';
import { Observable } from 'rxjs';
import { Product, UserProductRs, UserRs } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Get user profile
  getUserProfile(): Observable<UserRs> {
    return this.http.get<UserRs>(`${environment.baseurl}${environment.endPoints.profile}`);
  }

  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseurl}${environment.endPoints.products}`);
  }

  // Add a product to favorites
  addProductToFavorites(productId: number): Observable<any> {
    return this.http.post<any>(`${environment.baseurl}${environment.endPoints.addProduct}`, productId );
  }

  // Get favorite products
  getFavoriteProducts(): Observable<UserProductRs[]> {
    return this.http.get<UserProductRs[]>(`${environment.baseurl}${environment.endPoints.getFavoritesProducts}`);
  }

  // Delete a product from favorites
  deleteFromFavorites(productId: number): Observable<any> {
    return this.http.post<any>(`${environment.baseurl}${environment.endPoints.deleteFromFavorites}`, productId );
  }

  // Save a product to the favorite list
  saveProductToFavorites(productId: UserProductRs): Observable<any> {
    return this.http.post<any>(`${environment.baseurl}${environment.endPoints.addSaveFavoriteList}`, productId );
  }

}
