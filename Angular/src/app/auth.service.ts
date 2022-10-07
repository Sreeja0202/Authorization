import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signupUSer(user: any) {
    console.log(user);
    return this.http.post<any>('http://localhost:3000/api/register', user);
  }

  loginUser(user: any) {
    return this.http.post<any>('http://localhost:3000/api/login', user);
  }

  IsloggedIn() {
    return !!localStorage.getItem('token');
  }

  HaveAccess() {
    var logintoken = localStorage.getItem('token') || '';
    console.log(logintoken);
    var extractedToken = logintoken.split('.')[1];
    var atobdata = atob(extractedToken);
    var finalData = JSON.parse(atobdata);
    if (
      finalData.aemail == 'admin@gmail.com' &&
      finalData.apassword == '123456'
    ) {
      return true;
    } else {
      console.log(finalData);
      alert('You are not authorized');
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
