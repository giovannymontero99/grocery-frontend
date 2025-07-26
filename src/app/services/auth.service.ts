import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../interfaces/interfaces';
import { constant } from '../../const/const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) { }

  /**
   * Retrieves the user token from local storage.
   *
   * @returns The user token or null if not found.
   */
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  /**
   * Stores the user token in local storage.
   *
   * @param token - The token to store.
   */
  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('auth_token', token);
    }
  }

  /**
   * Logs out the user.
   */
  logout(): void {
    if(isPlatformBrowser(this.platformId)){
      localStorage.removeItem('auth_token');
    }
  }


  /**
   * Validates the user token.
   *
   * @returns An observable of the validation result.
   */
  validateToken(): Observable<boolean> {
    return this.http.get<boolean>('https://localhost:44364/api/v1/profile/')
  }

  /**
   * Logs in a user.
   *
   * @param user - The user information to log in.
   * @returns An observable of the login response.
   */
  login(user: User): Observable<any>{
    const baseUrl = constant.baseurl
    const endPoint = constant.endPoints.login
    return this.http.post(baseUrl + endPoint, user);
  }

  /**
   * Registers a new user.
   *
   * @param user - The user information to register.
   * @returns An observable of the registration response.
   */
  public register(user: User): Observable<any> {
    const baseUrl = constant.baseurl
    const endPoint = constant.endPoints.register
    return this.http.post(baseUrl + endPoint, user);
  }

}
