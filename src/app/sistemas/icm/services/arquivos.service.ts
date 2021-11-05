import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ArquivoRequest, ArquivoResponse, ArquivoAcessoTipoResponse } from '../models/arquivo.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Crypto } from 'src/app/utils/cryptojs';

@Injectable({
	providedIn: 'root'
})
export class ArquivosService {
	url = environment.url;
	loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	list: BehaviorSubject<ArquivoResponse[]> = new BehaviorSubject<ArquivoResponse[]>([]);
	listTipos: BehaviorSubject<ArquivoAcessoTipoResponse[]> = new BehaviorSubject<ArquivoAcessoTipoResponse[]>([]);

	constructor(
		private http: HttpClient,
	) { }

	getTipos(){
		return this.http.get<ArquivoAcessoTipoResponse[]>(this.url + '/arquivoacessotipo')
		.pipe(map(list => {
			this.listTipos.next(list)
		}));
	}

	getTipo(id: number){
		return this.http.get<ArquivoAcessoTipoResponse>(this.url + `/arquivoacessotipo/GetById?id${id}`);
	}

	getList(){
		return this.http.get<ArquivoResponse[]>(this.url + '/arquivo')
			.pipe(map(list => {
				this.list.next(list)
				return list;
			}));
	}

	get(id: number){
		return this.http.get<ArquivoResponse>(this.url + `/arquivo/getbyid?id=${id}`);
	}

	create(model: ArquivoRequest){
		return this.http.post<ArquivoResponse>(this.url + `/arquivo`, model);
	}

	edit(model: ArquivoRequest){
		return this.http.put<ArquivoResponse>(this.url, model);
	}

	delete(id: number){
		return this.http.delete<ArquivoResponse>(this.url + `/${id}`);
	}

}
