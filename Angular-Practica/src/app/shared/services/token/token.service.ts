import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setActiveToken(body: string): boolean {
    localStorage.setItem('token', body);
    return true;
  }

  getActiveToken(): string {
    return localStorage.getItem('token');
  }

  logOutToken(){
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') != null ;
  }
}
