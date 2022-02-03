import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Crypto } from 'src/app/utils/cryptojs';
import { MovimentacoesFiltro, MovimentacoesResponse } from '../models/movimentacoes.model';
import { DatePipe } from '@angular/common';
import { AppConfigService } from 'src/app/services/app-config.service';
@Injectable({
	providedIn: 'root'
})
export class MovimentacoesService {
	url = "";
	loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	list: BehaviorSubject<MovimentacoesResponse[]> = new BehaviorSubject<MovimentacoesResponse[]>([]);
	filtro: BehaviorSubject<MovimentacoesFiltro | undefined> = new BehaviorSubject<MovimentacoesFiltro | undefined>(undefined);

	constructor(
		private http: HttpClient,
		private crypto: Crypto,
		private datePipe: DatePipe,
    private appConfigService: AppConfigService
	) {
    this.appConfigService.appConfig.subscribe(res => {
      this.url = res.apiBaseUrl;
    });
   }

	getList(){
		return this.http.get<MovimentacoesResponse[]>(this.url + '/movimento')
			.pipe(map(list => {
				list.forEach(item => {
					item.idEncrypted = this.crypto.encrypt(item.id);
					item.dataHora = new Date(new Date(item.dataHora).toDateString())
					return item;
				})
				if (this.filtro.value != undefined) {
					if (this.filtro.value.caminho) {
						var lista = list.filter(x => x.caminho == this.filtro.value?.caminho);
						this.list.next(lista);
					}

					if (this.filtro.value.de != '') {
						var de = new Date(this.filtro.value.de + 'T00:00:00.000');
						var lista = list.filter(x => x.dataHora >= de);
						this.list.next(lista);
					}

					if (this.filtro.value.ate != '') {
						var ate = new Date(this.filtro.value.ate + 'T00:00:00.000');
						var lista = list.filter(x => x.dataHora <= ate);
						this.list.next(lista);
					}

					if (this.filtro.value.de != '' && this.filtro.value.ate != '' && this.filtro.value.dataHora != '') {
						var data = this.datePipe.transform(this.filtro.value.dataHora as string, 'dd/MM/yyyy');
						var lista = list.filter(x => this.datePipe.transform(x.dataHora, 'dd/MM/yyyy') == data);
						this.list.next(lista);
					}

					if (this.filtro.value?.movimento_Tipo) {
						var lista = list.filter(x => x.movimento_Tipo == this.filtro.value?.movimento_Tipo);
						this.list.next(lista);
					}
					if (this.filtro.value?.nome) {
						var lista = list.filter(x => x.nome == this.filtro.value?.nome);
						this.list.next(lista);
					}
					if (this.filtro.value?.caminho) {
						var lista = list.filter(x => x.caminho == this.filtro.value?.caminho);
						this.list.next(lista);
					}
					return list;
				}

				this.list.next(list)
				return list;
			}));
	}
	parseDate(date: string){
		return  new Date(date).toLocaleString();
	}
}
