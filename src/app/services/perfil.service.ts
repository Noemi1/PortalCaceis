import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PerfilRequest, PerfilResponse, PerfilUpdateRequest } from '../models/perfil.model';
import { Crypto } from '../utils/cryptojs';

@Injectable({
	providedIn: 'root'
})
export class PerfilService {
	url = environment.url;
	loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	list: BehaviorSubject<PerfilResponse[]> = new BehaviorSubject<PerfilResponse[]>([]);

	constructor(
		private http: HttpClient,
		private crypto: Crypto
		) { }
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
		return this.http.get<PerfilResponse>(this.url + `/perfil/getbyid?id=${id}`);
	}

	create(model: PerfilRequest) {
		return this.http.post<PerfilResponse>(this.url + `/perfil`, model);
	}

	edit(model: PerfilUpdateRequest) {
		return this.http.put<PerfilResponse>(this.url + `/perfil`, model);
	}

	delete(id: number) {
		return this.http.delete<any>(this.url + `/perfil?id=${id}`);
	}

}
