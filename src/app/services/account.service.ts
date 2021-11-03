import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	baseUrl = environment.url;
	// private accountSubject: BehaviorSubject<Account>;
	// public account: Observable<Account>;

	constructor(
		private http: HttpClient,
	) { 
		// this.accountSubject = new BehaviorSubject<Account>(new Account);
		// this.account = this.accountSubject.asObservable();
	}

	// public get accountValue(): Account {
	// 	var account = localStorage.getItem('open-finance');
	// 	if (account != undefined && account != '') {
	// 		var accountObj = JSON.parse(account) as Account;
	// 		try {
	// 			accountObj.role = this.crypto.decrypt(accountObj.role) as Role;
	// 			accountObj.id = parseInt(this.crypto.decrypt(accountObj.id.toString()));
	// 			this.accountSubject.next(accountObj);
	// 		} catch (err) {
	// 			this.isLoggedIn.emit(false);
	// 			return this.accountSubject.value;
	// 		}
	// 		this.isLoggedIn.emit(true);
	// 	} else {
	// 		this.isLoggedIn.emit(false);
	// 	}
	// 	return this.accountSubject.value;
	// }
	login(model: LoginRequest) {
		return this.http.post(`${this.baseUrl}/Account`, model)
			.pipe(map(res => {

			}))
	}



}
