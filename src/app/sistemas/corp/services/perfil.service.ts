import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PerfilRequest, PerfilResponse, PerfilUpdateRequest } from '../models/perfil.model';
import { Crypto } from '../../../utils/cryptojs';
import { AcessoResponse } from '../models/acessos.model';

@Injectable({
	providedIn: 'root'
})
export class PerfilService {
	url = environment.url;
	loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	list: BehaviorSubject<PerfilResponse[]> = new BehaviorSubject<PerfilResponse[]>([]);
	listAcessos: BehaviorSubject<AcessoResponse[]> = new BehaviorSubject<AcessoResponse[]>([]);

	constructor(
		private http: HttpClient,
		private crypto: Crypto
	) { }

	getListAcessos(){
		return this.http.get<AcessoResponse[]>(`${this.url}/acesso`)
			.pipe(map(acessos => {
				acessos.forEach(acesso => {
					acesso.idEncrypted = this.crypto.encrypt(acesso.id);
					return acesso;
				})
				this.listAcessos.next(acessos);
				return acessos;
			}))
	}


	getList() {
		return this.http.get<PerfilResponse[]>(this.url + '/perfil')
			.pipe(map(list => {
				list.forEach(item => {
					item.idEncrypted = this.crypto.encrypt(item.id);
					return item;
				})
				this.list.next(list)
				return list;
			}));
	}

	get(id: number) {
		return this.http.get<PerfilResponse>(this.url + `/perfil/getbyid?perfil_Id=${id}`)
		.pipe(map(perfil => {
			perfil.idEncrypted = this.crypto.encrypt(perfil.id);
			perfil.perfilAcessos.map(x => {
				x.idEncrypted = this.crypto.encrypt(x.id);
				return x;
			})
			return perfil;
		}));
	}

	create(model: PerfilRequest) {
		return this.http.post<PerfilResponse>(this.url + `/perfil`, model);
	}

	edit(id: number, model: PerfilUpdateRequest) {
		return this.http.put<PerfilResponse>(this.url + `/perfil?perfil_Id=${id}`, model);
	}

	delete(id: number) {
		return this.http.delete<any>(this.url + `/perfil?perfil_Id=${id}`);
	}

}
