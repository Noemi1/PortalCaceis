import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Crypto } from '../utils/cryptojs';
import { Router } from '@angular/router';
import { AccountRequest, AccountResponse, UserLogado } from '../models/account.model';
import { ResetPassword } from '../models/account.model';
import { UpdateUsuarioRequest, UsuarioRequest, UsuarioResponse } from '../sistemas/corp/models/usuario.model';

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	baseUrl = environment.url;
	private account: BehaviorSubject<AccountResponse | undefined>;
	private userLogado: BehaviorSubject<UserLogado | undefined>;
	isLoggedIn = new EventEmitter();

	list: BehaviorSubject<UsuarioResponse[]> = new BehaviorSubject<UsuarioResponse[]>([]);

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

	get(id: number) {
		return this.http.get<UsuarioResponse>(`${this.baseUrl}/account/getById?id=${id}`)

	}
	
	getList(){
		return this.http.get<UsuarioResponse[]>(`${this.baseUrl}/account`)
		.pipe(map(list => {
			list.forEach(item => {
				item.idEncrypted = this.crypto.encrypt(item.id);
				return item;
			})
			this.list.next(list);
			return list;
		}));
	}

	createAccount(account: UsuarioRequest) {
		return this.http.post<UsuarioResponse>(`${this.baseUrl}/account`, account)
			.pipe(map(account => {
				account.idEncrypted = this.crypto.encrypt(account.id);
				return account;
			}));
	}

	updateAccount(account: UpdateUsuarioRequest) {
		return this.http.put<UsuarioResponse>(`${this.baseUrl}/account?account_id=${account.id}`, account)
			.pipe(map(account => {
				account.idEncrypted = this.crypto.encrypt(account.id);
				return account;
			}));
	}

	setStatusAccount(id: number, desativar: boolean) {
		return this.http.post(`${this.baseUrl}/account/set-status`, {account_Id: id, desativar: desativar});
	}

	updatePassword(model: ResetPassword){
		return this.http.post(`${this.baseUrl}/account/update-password`, model);
	}

	updateProfile(model: UserLogado){
		return this.http.post(`${this.baseUrl}/account/update-profile`, model);
	}

	forgotPassword(documento: string) {
		return this.http.post(`${this.baseUrl}/account/forgot-password`, { documento: documento});
	}

	resetPassword(model: ResetPassword) {
		return this.http.post(`${this.baseUrl}/account/reset-password`, model);
	}

}
