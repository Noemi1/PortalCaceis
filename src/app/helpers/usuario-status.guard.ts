import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { UsuarioResponse } from '../sistemas/corp/models/usuario.model';
import { Crypto } from '../utils/cryptojs';

@Injectable({
	providedIn: 'root'
})
export class UsuarioStatusGuard implements CanActivate {
	
	obj: UsuarioResponse = new UsuarioResponse;
	desativar = false;
	id = 0;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private accountService: AccountService,
		private toastr: ToastrService,
		private crypto: Crypto
	) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		
		if (route.routeConfig?.path == 'ativar') {
			this.desativar = false;
		} else if (route.routeConfig?.path == 'desativar') {
			this.desativar = true;
		}
		if (route.queryParams['id']) {
			let id = route.queryParams['id'];
			this.id = this.crypto.decrypt(id);
		} else {
			this.toastr.warning('Conta não encontrada');
			this.router.navigate(['/corp/accounts']);
			return false;
		}

		return this.accountService.get(this.id).pipe(map(res => {
			this.obj = res;
			if(!route.routeConfig) {
				this.router.navigate(['/corp/accounts']);
				return false;
			}
			if (res.isVerified && route.routeConfig?.path == 'ativar') {
				this.toastr.warning('Essa conta já está ativa');
				this.router.navigate(['/corp/accounts']);
				return false;
			} else if (!res.isVerified && route.routeConfig?.path == 'desativar') {
				this.toastr.warning('Essa conta já está inativa');
				this.router.navigate(['/corp/accounts']);
				return false;
			} else {
				return true;
			}
		}));
	}
}
