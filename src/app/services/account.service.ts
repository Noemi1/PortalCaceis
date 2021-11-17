import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Crypto } from '../utils/cryptojs';
import { Router } from '@angular/router';
import { AccountRequest, AccountResponse, UserLogado } from '../models/login.model';
import { ResetPassword } from '../models/account.model';

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	baseUrl = environment.url;
	private account: BehaviorSubject<AccountResponse | undefined>;
	private userLogado: BehaviorSubject<UserLogado | undefined>;
	isLoggedIn = new EventEmitter();

	constructor(
		private http: HttpClient,
		private crypto: Crypto,
		private router: Router
	) {
		this.account = new BehaviorSubject<AccountResponse | undefined>(undefined);
		this.userLogado = new BehaviorSubject<UserLogado | undefined>(undefined);
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
			if(account == undefined){
				this.isLoggedIn.emit(false);
			}
			return this.account;
		} 
		catch(err) {
			this.isLoggedIn.emit(false);
			return new BehaviorSubject<AccountResponse | undefined>(undefined);
		}
	}
	setAccount(value: AccountResponse | undefined){
		if(typeof value == 'string') {
			value = undefined;
		}
		localStorage.setItem('portal-caceis', this.crypto.encrypt(value))
		this.account.next(value);
		if(value != undefined) {
			this.isLoggedIn.emit(true);
		} else {
			this.isLoggedIn.emit(false);
		}
	}

	getProfile(){
		return this.http.get<UserLogado>(`${this.baseUrl}/account/getProfile`)
		.toPromise().then(userLogado => {
			var account = this.accountValue;
			if(account != undefined && userLogado != undefined) {
				account.userLogado = userLogado;
				this.userLogado.next(userLogado);
				this.setAccount(account);
			}
			return userLogado;
		});
	}

	login(model: AccountRequest) {
		return this.http.post<AccountResponse>(`${this.baseUrl}/account/authenticate`, model)
			.pipe(map(account => {
				if(typeof account == 'string') {
					console.log('login')
				}
				this.setAccount(account);
 				this.getProfile();
				return account;
			}))
	}

	logout(){
		this.setAccount(undefined);
		this.router.navigate(['account/acessar']);
	}
	

	updatePassword(model: ResetPassword){
		return this.http.post(`${this.baseUrl}/account/update-password`, model);
	}

	updateProfile(model: UserLogado){
		return this.http.post(`${this.baseUrl}/account/update-profile`, model);
	}

}
