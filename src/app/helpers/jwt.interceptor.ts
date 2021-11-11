import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { Crypto } from '../utils/cryptojs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private accountService: AccountService,
        private crypto: Crypto,
        private toastr: ToastrService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        const account = this.accountService.accountValue;
        if(account != undefined) {
            const isLoggedIn = account?.jwtToken != '' && account?.jwtToken != undefined && account?.id != 0;
            if (isLoggedIn) {
                request = request.clone({
                    setHeaders: { Authorization: `Bearer ${account?.jwtToken}` },
                });
            }
        }
        return next.handle(request);
    }
}