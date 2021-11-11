import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ArquivoRequest, ArquivoResponse, ArquivoAcessoTipoResponse, ArquivoUpdateRequest } from '../models/arquivo.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Crypto } from 'src/app/utils/cryptojs';
import { MovimentacoesResponse } from '../models/movimentacoes.model';

@Injectable({
	providedIn: 'root'
})
export class MovimentacoesService {
	url = environment.url;
	loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	list: BehaviorSubject<MovimentacoesResponse[]> = new BehaviorSubject<MovimentacoesResponse[]>([]);

	constructor(
		private http: HttpClient,
		private crypto: Crypto
	) { }

	getList(){
		return this.http.get<MovimentacoesResponse[]>(this.url + '/movimento')
			.pipe(map(list => {
				list.forEach(item => {
					item.idEncrypted = this.crypto.encrypt(item.id);
					return item;
				})
				this.list.next(list)
				return list;
			}));
	}
}
