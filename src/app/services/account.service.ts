import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Crypto } from '../utils/cryptojs';
import { Router } from '@angular/router';
import { AccountRequest, AccountResponse } from '../models/login.model';

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
			var local_Storage = localStorage.getItem('portal-caceis');
			var account = this.crypto.decrypt(local_Storage);
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
			var local_Storage = localStorage.getItem('portal-caceis');
			var account = this.crypto.decrypt(local_Storage);
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
				this.isLoggedIn.emit(true)
				return account;
			}))
	}


	logout(){
		this.setAccount(undefined);
		this.router.navigate(['account/acessar']);
	}


}
