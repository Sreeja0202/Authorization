import { Inject, Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private inject: Injector) {}
  intercept(req: any, next: any) {
    let authservice = this.inject.get(AuthService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authservice.getToken()}`,
      },
    });
    return next.handle(tokenizedReq);
  }
}
