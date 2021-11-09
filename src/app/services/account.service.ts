import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountRequest, AccountResponse } from '../models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Crypto } from '../utils/cryptojs';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	baseUrl = environment.url;
	private account: BehaviorSubject<AccountResponse | undefined>;
	isLoggedIn = new EventEmitter();

	constructor(
		private http: HttpClient,
		private crypto: Crypto,
		private router: Router
	) {
		this.account = new BehaviorSubject<AccountResponse | undefined>(undefined);
	}

	public get accountValue():AccountResponse | undefined {
		try {
			var account = this.crypto.decrypt(localStorage.getItem('portal-caceis'));
			account = account as AccountResponse | undefined;
			this.setAccount(account);
			if(this.account == undefined)
				this.isLoggedIn.emit(false);
			return this.account.value;
		} 
		catch(err) {
			this.isLoggedIn.emit(false);
			return undefined;
		}
	}

	getAccount(): BehaviorSubject<AccountResponse | undefined>{
		try {
			var account = this.crypto.decrypt(localStorage.getItem('portal-caceis'));
			account = account as AccountResponse | undefined;
			if(this.account == undefined)
				this.isLoggedIn.emit(false);
			return this.account;
		} 
		catch(err) {
			this.isLoggedIn.emit(false);
			return new BehaviorSubject<AccountResponse | undefined>(undefined);
		}
	}
	setAccount(value: AccountResponse | undefined){
		localStorage.setItem('portal-caceis', this.crypto.encrypt(value))
		this.account.next(value);
	}

	login(model: AccountRequest) {
		return this.http.post<AccountResponse>(`${this.baseUrl}/account/authenticate`, model)
			.pipe(map(account => {
				localStorage.setItem('portal-caceis', this.crypto.encrypt(account))
				this.setAccount(account);
				return account;
			}))
	}


	logout(){
		this.setAccount(undefined);
		this.router.navigate(['account/acessar'])
		// return this.http.post(`${this.baseUrl}/account/logout`, this.account.value?.jwtToken)
		// 	.toPromise()
		// 	.then(res => {

		// 	})
		// 	.catch(res => {
				
		// 	})
	}


}
