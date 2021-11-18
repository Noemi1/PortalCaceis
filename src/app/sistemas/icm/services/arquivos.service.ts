import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ArquivoRequest, ArquivoResponse, ArquivoAcessoTipoResponse, ArquivoUpdateRequest, ArquivoFiltro } from '../models/arquivo.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Crypto } from 'src/app/utils/cryptojs';
import { DatePipe } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class ArquivosService {
	url = environment.url;
	loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	list: BehaviorSubject<ArquivoResponse[]> = new BehaviorSubject<ArquivoResponse[]>([]);
	listTipos: BehaviorSubject<ArquivoAcessoTipoResponse[]> = new BehaviorSubject<ArquivoAcessoTipoResponse[]>([]);
	filtro: BehaviorSubject<ArquivoFiltro | undefined> = new BehaviorSubject<ArquivoFiltro | undefined>(undefined);

	constructor(
		private http: HttpClient,
		private crypto: Crypto,
		private datePipe: DatePipe
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
				list.forEach(item => {
					item.idEncrypted = this.crypto.encrypt(item.id);
					item.dataCadastro = new Date(new Date(item.dataCadastro).toDateString())
					return item;
				})
				if (this.filtro.value != undefined) {
					if (this.filtro.value.nome?.trim()) {
						list = list.filter(x => x.nome == this.filtro.value?.nome);
						this.list.next(list);
					}


					if (this.filtro.value.de != '') {
						var de = new Date(this.filtro.value.de + 'T00:00:00.000');
						list = list.filter(x => x.dataCadastro >= de);
						this.list.next(list);
					}

					if (this.filtro.value.ate != '') {
						var ate = new Date(this.filtro.value.ate + 'T00:00:00.000');
						list = list.filter(x => x.dataCadastro <= ate);
						this.list.next(list);
					}

					if (this.filtro.value.de == '' && this.filtro.value.ate == '' && this.filtro.value.dataHora != '') {
						var data = this.datePipe.transform(this.filtro.value.dataHora as string, 'dd/MM/yyyy');
						list = list.filter(x => this.datePipe.transform(x.dataCadastro, 'dd/MM/yyyy') == data);
						this.list.next(list);
					} 
					
					if (this.filtro.value?.acessoTipo_Origem_Id) {
						list = list.filter(x => x.acessoTipo_Origem_Id == this.filtro.value?.acessoTipo_Origem_Id);
						this.list.next(list);
					}
					
					if (this.filtro.value?.acessoTipo_Destino_Id) {
						list = list.filter(x => x.acessoTipo_Destino_Id == this.filtro.value?.acessoTipo_Destino_Id);
						this.list.next(list);
					}
					if (this.filtro.value?.caminhoOrigem?.trim()) {
						list = list.filter(x => x.caminhoOrigem == this.filtro.value?.caminhoOrigem);
						this.list.next(list);
					}
					if (this.filtro.value?.caminhoDestino?.trim()) {
						list = list.filter(x => x.caminhoDestino == this.filtro.value?.caminhoDestino);
						this.list.next(list);
					}
					return list;
				}
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

	edit(model: ArquivoUpdateRequest){
		return this.http.put<ArquivoResponse>(this.url + `/arquivo`, model);
	}

	delete(id: number){
		return this.http.delete<any>(this.url + `/arquivo?id=${id}`);
	}

	download(id: number): Observable<Blob>{
		return this.http.get(this.url + `/arquivo/getbyid?id=${id}`, { responseType: 'blob'});
	}

}
