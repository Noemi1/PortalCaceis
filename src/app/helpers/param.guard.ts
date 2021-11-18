import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { UsuarioResponse } from '../sistemas/corp/models/usuario.model';
import { Crypto } from '../utils/cryptojs';
import { Format } from '../utils/format';

@Injectable({
	providedIn: 'root'
})
export class ParamGuard implements CanActivate {
	
	obj: UsuarioResponse = new UsuarioResponse;
	contemParametros = true;
	parametrosFaltando: string[] = []
	id = 0;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private accountService: AccountService,
		private toastr: ToastrService,
		private crypto: Crypto,
		private format: Format
	) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if(route.data.params) {
			route.data.params.forEach(param => {
			var includes = route.queryParamMap.has(param);
				if(includes) {
					this.contemParametros = true;
				} else {
					this.parametrosFaltando.push(param)
					this.contemParametros = false;
				}
			})
		}

		if(this.contemParametros) {
			return true;
		} else {
			this.parametrosFaltando.forEach(param => {
				this.toastr.error(`Parâmetro ${this.format.first_upper(param)} obrigatório ou inválido`)
			})
			if(route.data.returnUrl && route.data.returnUrl.trim()) {
				this.router.navigateByUrl(route.data.returnUrl);
			}
			return false;
		}

	}
}
