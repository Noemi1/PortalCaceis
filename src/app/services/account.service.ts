import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResponse } from '../models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Crypto } from '../utils/cryptojs';

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	baseUrl = environment.url;
	private accountSubject: BehaviorSubject<LoginResponse>;
	public account: Observable<LoginResponse>;
	isLoggedIn = new EventEmitter();

	constructor(
		private http: HttpClient,
		private crypto: Crypto
	) {
		this.accountSubject = new BehaviorSubject<LoginResponse>(new LoginResponse);
		this.account = this.accountSubject.asObservable();
	}

	public get accountValue(): LoginResponse | undefined {
		var account = localStorage.getItem('open-finance');
		if (account != undefined && account != '') {
			var accountObj = JSON.parse(account) as LoginResponse;
			try {
				this.accountSubject.next(accountObj);
			} catch (err) {
				this.isLoggedIn.emit(false);
				return undefined;
			}
			this.isLoggedIn.emit(true);
		} else {
			this.isLoggedIn.emit(false);
			return undefined;
		}
		return this.accountSubject.value;
	}

	login(model: LoginRequest) {
		return this.http.post<LoginResponse>(`${this.baseUrl}/account/authenticate`, model)
			.pipe(map(account => {
				let encrypted = this.crypto.encrypt(account)
				localStorage.setItem('portal-caceis', encrypted)
				this.accountSubject.next(account);
				return account;
			}))
	}


	logout(){
		return this.http.post(`${this.baseUrl}/account/logout`, this.accountSubject.value.jwtToken)
	}


}
