import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	
	constructor(
		private router: Router,
		private accountService: AccountService
	) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
			
		const account = this.accountService.accountValue;
		if(account != undefined) {
			return true;
		}
        this.router.navigate(['/account/acessar'], { queryParams: { returnUrl: state.url }});
		return false;
	}
}
