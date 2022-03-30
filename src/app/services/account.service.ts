import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Crypto } from '../utils/cryptojs';
import { Router } from '@angular/router';
import { AccountRequest, AccountResponse, UserLogado } from '../models/account.model';
import { ResetPassword } from '../models/account.model';
import { UpdateUsuarioRequest, UsuarioFiltro, UsuarioRequest, UsuarioResponse } from '../sistemas/corp/models/usuario.model';
import { DatePipe } from '@angular/common';
import { AppConfigService } from './app-config.service';

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	url: string = '';
	account: BehaviorSubject<AccountResponse | undefined>;
	private userLogado: BehaviorSubject<UserLogado | undefined>;
	isLoggedIn = new EventEmitter();

	list: BehaviorSubject<UsuarioResponse[]> = new BehaviorSubject<UsuarioResponse[]>([]);
	filtro: BehaviorSubject<UsuarioFiltro | undefined> = new BehaviorSubject<UsuarioFiltro | undefined>(undefined);

	constructor(
		private http: HttpClient,
		private crypto: Crypto,
		private router: Router,
		private datePipe: DatePipe,
    private appConfigService: AppConfigService
	) {
		this.account = new BehaviorSubject<AccountResponse | undefined>(undefined);
		this.userLogado = new BehaviorSubject<UserLogado | undefined>(undefined);
    this.appConfigService.appConfig.subscribe(res => {
      this.url = res.apiBaseUrl;
    });
	}

	public get accountValue():AccountResponse | undefined {
		try {
			var local_Storage = localStorage.getItem('portal-caceis');
			var account = this.crypto.decrypt(local_Storage) as AccountResponse | undefined;
			if(account == undefined || typeof(account) == 'string') {
				this.isLoggedIn.emit(false);
				this.setAccount(undefined)
				account = undefined;
			}
			else {
				this.isLoggedIn.emit(true);
				this.setAccount(account)

			}
			return account;
		}
		catch(err) {
			this.isLoggedIn.emit(false);
			this.setAccount(undefined)
			return undefined;
		}
	}

	getAccount(): BehaviorSubject<AccountResponse | undefined>{
		try {
			var local_Storage = localStorage.getItem('portal-caceis');
			var account = this.crypto.decrypt(local_Storage) as AccountResponse | undefined;
			if(account == undefined || typeof(account) == 'string') {
				this.isLoggedIn.emit(false);
				this.setAccount(undefined)
				account = undefined;
			}
			else {
				this.isLoggedIn.emit(true);
				this.setAccount(account)

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
		return this.http.get<UserLogado>(`${this.url}/account/getProfile`)
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
    console.log("Base URL Login", this.url)
		return this.http.post<AccountResponse>(`${this.url}/account/authenticate`, model)
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
		return this.http.post(`${this.url}/account/revoke-token`, { token: this.accountValue?.refreshToken})
			.toPromise()
			.finally(()=> {
				this.setAccount(undefined);
				this.router.navigate(['account/acessar']);
			})
	}

	get(id: number) {
		return this.http.get<UsuarioResponse>(`${this.url}/account/getById?id=${id}`)

	}

	getList(){
		return this.http.get<UsuarioResponse[]>(`${this.url}/account`)
		.pipe(map(list => {
			list.forEach(item => {
				item.idEncrypted = this.crypto.encrypt(item.id);
				item.created = new Date(new Date(item.created).toDateString())
				item.perfil_Id = item.perfilAccounts.map(x => x.perfil_Id);
				return item;
			})
			if(this.filtro.value != undefined) {
				let filtro = this.filtro.value

				if(filtro.nome?.trim()) {
					list = list.filter(x => x.nome == filtro.nome);
					this.list.next(list)
				}
				if(filtro.email?.trim()) {
					list = list.filter(x => x.email == filtro.email);
					this.list.next(list)
				}
				if(filtro.documento?.trim()) {
					list = 	list.filter(x => x.documento == filtro.documento);
					this.list.next(list)
				}
				if(filtro.status != undefined) {
					list = list.filter(x => x.isVerified == filtro.status);
					this.list.next(list)
				}

				if (filtro.de != '') {
					var de = new Date(filtro.de + 'T00:00:00.000');
					list = list.filter(x => x.created >= de);
					this.list.next(list);
				}

				if (filtro.ate != '') {
					var ate = new Date(filtro.ate + 'T00:00:00.000');
					list = list.filter(x => x.created <= ate);
					this.list.next(list);
				}
				if (filtro.de == '' && filtro.ate == '' && filtro.dataCadastro != '') {
					var data = this.datePipe.transform(filtro.dataCadastro as string, 'dd/MM/yyyy');
					list = list.filter(x => this.datePipe.transform(x.created, 'dd/MM/yyyy') == data);
					this.list.next(list);
				}

				if (filtro.perfis && filtro.perfis.length > 0) {
					filtro.perfis.forEach(item => {
						list = list.filter(x => x.perfil_Id.includes(item.id));
					});
					this.list.next(list);
				}
				return list;
			}
			this.list.next(list);
			return list;
		}));
	}

	createAccount(account: UsuarioRequest) {
		return this.http.post<UsuarioResponse>(`${this.url}/account`, account)
			.pipe(map(account => {
				account.idEncrypted = this.crypto.encrypt(account.id);
				return account;
			}));
	}

	updateAccount(account: UpdateUsuarioRequest) {
		return this.http.put<UsuarioResponse>(`${this.url}/account?account_id=${account.id}`, account)
			.pipe(map(account => {
				account.idEncrypted = this.crypto.encrypt(account.id);
				return account;
			}));
	}

	setStatusAccount(id: number, desativar: boolean) {
		return this.http.post(`${this.url}/account/set-status`, {account_Id: id, desativar: desativar});
	}

	updatePassword(model: ResetPassword){
		return this.http.post(`${this.url}/account/update-password`, model);
	}

	updateProfile(model: UserLogado){
		return this.http.post<UserLogado>(`${this.url}/account/update-profile`, model);
	}

	forgotPassword(documento: string) {
		return this.http.post(`${this.url}/account/forgot-password`, { documento: documento});
	}

	resetPassword(model: ResetPassword) {
		return this.http.post(`${this.url}/account/reset-password`, model);
	}

}
