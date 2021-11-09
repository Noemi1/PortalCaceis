import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AlertService } from '../parts/alert/alert.service';
import { AccountService } from '../services/account.service';

@Injectable({
	providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {
	
	constructor(
		private router: Router,
		private accountService: AccountService,
		private alertService: AlertService,
		private toastrService: ToastrService
	) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.funcao(route, state);
	}

	canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.funcao(route, state);
	}


	funcao (
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		const account = this.accountService.accountValue;
		var url = state.url;
		var urlSplit = url.split('/')[1].toLowerCase();

		if (route.data.roles) {
			var includes = route.data.roles.map(x => x.toLowerCase()).includes(urlSplit) && account?.sistemas.map(x => x.sigla.toLowerCase()).includes(urlSplit);
			
			if(includes) {
				return true
			}
		}
		this.toastrService.error('Acesso não autorizado')
		this.alertService.error('Acesso não autorizado', {
			id: '654',
			background: true,
			button: 'OK',
			buttonCallback: () => {
				this.alertService.clear('654')
			}
		})
		return false;
	}

}
