import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginRequest, User, MeResponse, LoginResponse, RegisterRequest, RegisterResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly authApiUrl = 'http://localhost:3977/api/auth';
  private readonly accessTokenKey = 'accessToken';

  private readonly authenticated = signal(localStorage.getItem(this.accessTokenKey) !== null);
  public readonly isAuthenticated = this.authenticated.asReadonly();

  private readonly user = signal<User | null>(null);
  public readonly currentUser = this.user.asReadonly();

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authApiUrl}/login`, credentials);
  }

  register(credentials: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.authApiUrl}/register`, credentials);
  }

  
  getUserInfo(): Observable<MeResponse>{
    const token = this.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<MeResponse>(`${this.authApiUrl}/me`, {headers}); 
  }

  saveToken(token: string): void{
    localStorage.setItem(this.accessTokenKey, token);
    this.authenticated.set(true);
  }

  saveAuthenticatedUser(user: User){
    this.user.set(user);    
  }

  logout(): void{
    localStorage.removeItem(this.accessTokenKey);
    this.authenticated.set(false);
    this.user.set(null);    
  }

  getToken(): string | null {    
    return localStorage.getItem(this.accessTokenKey);
  }
}
