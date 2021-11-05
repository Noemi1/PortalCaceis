import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ArquivoRequest, ArquivoResponse, ArquivoAcessoTipoResponse } from '../models/arquivo.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ArquivosService {
	url = environment.url;
	loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	list: BehaviorSubject<ArquivoResponse[]> = new BehaviorSubject<ArquivoResponse[]>([]);
	listTipos: BehaviorSubject<ArquivoAcessoTipoResponse[]> = new BehaviorSubject<ArquivoAcessoTipoResponse[]>([]);

	constructor(
		private router: Router,
		private http: HttpClient,
	) { }

	getTipos(){
		return this.http.get<ArquivoAcessoTipoResponse[]>(this.url)
		.pipe(map(list => {
			this.listTipos.next(list)
		}));
	}

	getTipo(id: number){
		return this.http.get<ArquivoAcessoTipoResponse>(this.url + `/${id}`);
	}

	getList(){
		return this.http.get<ArquivoResponse[]>(this.url)
			.pipe(map(list => {
				this.list.next(list)
				return list;
			}));
	}

	get(id: number){
		return this.http.get<ArquivoResponse>(this.url + `/${id}`);
	}

	create(model: ArquivoRequest){
		return this.http.post<ArquivoResponse>(this.url, model);
	}

	edit(model: ArquivoRequest){
		return this.http.put<ArquivoResponse>(this.url, model);
	}

	delete(id: number){
		return this.http.delete<ArquivoResponse>(this.url + `/${id}`);
	}

}
