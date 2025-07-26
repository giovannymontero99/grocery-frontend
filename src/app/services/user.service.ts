import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../../const/const';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserProfile() {
    return this.http.get(`${constant.baseurl}${constant.endPoints.profile}`);
  }

}
