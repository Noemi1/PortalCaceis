import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private accountService: AccountService,
        private router: Router,
        private toastr: ToastrService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

          if(err.status == 401) {
            this.accountService.setAccount(undefined);
            this.router.navigate(['account/acessar'])
            this.toastr.error('O servidor retornou status não autorizado. Faça login');
          }
          else if (err.status == 403) {
            this.toastr.error('Seu usuário não tem acesso para realizar essa operação.');
          }
          else if (err.status == 404) {
            this.toastr.error('O servidor não pode encontrar o recurso solicitado.');
          }
          else if (err.status == 408) {
            this.toastr.error('O servidor demorou muito tempo para responder. <br> A operação foi finalizada.', undefined,  { enableHtml: true } );
          }
          else if (err.status == 500) {
              this.toastr.error('Ocorreu um erro inesperado.');
          }
          else if (err.status == 503) {
              this.toastr.error('O servidor está indisponível.');
          }
          else {
            this.toastr.error('Ocorreu um erro inesperado.')
          }
            const error = (err && err.error && err.error.message) || err.statusText;
            console.error('errorInterceptor: ', err)
            console.error(error)
            return throwError(error);
        }))
    }
}
