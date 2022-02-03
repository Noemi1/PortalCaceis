import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfigService } from 'src/app/services/app-config.service';
import { Crypto } from 'src/app/utils/cryptojs';
import { OrdemJudicialResponse, OrdemJudicial_Status_Response, OrdemJudicial_TipoOrdem_Response } from '../models/ordem-judicial.model';

@Injectable({
	providedIn: 'root'
})
export class OrdemJudicialService {

	url = "";
	list: BehaviorSubject<OrdemJudicialResponse[]> = new BehaviorSubject<OrdemJudicialResponse[]>([]);
	listStatus: BehaviorSubject<OrdemJudicial_Status_Response[]> = new BehaviorSubject<OrdemJudicial_Status_Response[]>([]);
	listTipoOrdem: BehaviorSubject<OrdemJudicial_TipoOrdem_Response[]> = new BehaviorSubject<OrdemJudicial_TipoOrdem_Response[]>([]);
	filtro: BehaviorSubject<OrdemJudicialResponse> = new BehaviorSubject<OrdemJudicialResponse>(new OrdemJudicialResponse);

	constructor(
		private crypto: Crypto,
		private http: HttpClient,
    private appConfigService: AppConfigService
	) {
    this.appConfigService.appConfig.subscribe(res => {
      this.url = res.apiBaseUrl;
    });
   }


	getList(){
		return this.http.get<OrdemJudicialResponse[]>(`${this.url}/ordem-judicial/`)
			.pipe(map(list => {
				list.forEach(item => {
					item.idEncrypted = this.crypto.encrypt(item.id);
					return item;
				});
				this.list.next(list);
				return list;
			}));
	}

	getStatus() {
		return this.http.get<OrdemJudicial_Status_Response[]>(`${this.url}/ordem-judicial/getStatus`)
			.pipe(map(list => {
				this.listStatus.next(list);
				return list;
			}));

	}

	getTipoOrdem() {
		return this.http.get<OrdemJudicial_TipoOrdem_Response[]>(`${this.url}/ordem-judicial/getTipoOrdem`)
			.pipe(map(list => {
				this.listTipoOrdem.next(list);
				return list;
			}));

	}

	get(id: number) {
		return this.http.get<OrdemJudicialResponse>(`${this.url}/ordem-judicial?id=${id}`)
			.pipe(map(item => {
				item.idEncrypted = this.crypto.encrypt(item.id);
				return item;
			}));
	}

	create(model: any) {
		return this.http.post<OrdemJudicialResponse>(`${this.url}/ordem-judicial`, model);
	}

	update(model: any) {
		return this.http.put<OrdemJudicialResponse>(`${this.url}/ordem-judicial`, model);
	}

	delete(id: number) {
		return this.http.delete(`${this.url}/ordem-judicial?id=${id}`);
	}
}
