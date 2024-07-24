import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    getToken() {
        throw new Error('Method not implemented.');
    }
  http = inject(HttpClient)
  cookieService = inject(CookieService)
  baseUrl = "https://video-tecks-backend-aqh8.onrender.com/api/auth/login"

  token: string | null = null
  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token')
    }
    return !!this.token
  }

 login(payload: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl, payload).pipe(
      tap((response: LoginResponse) => {
        this.token = response.token
        this.cookieService.set('token', this.token)
        console.log('Received token:', response.token);
      })
    );
  }
}
