import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../../const/const';
import { Observable } from 'rxjs';
import { Product, UserRs } from '../interfaces/interfaces';

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

}
