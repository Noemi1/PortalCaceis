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
					item.dataMovimento = new Date(new Date(item.dataMovimento).toDateString())
					return item;
				})
				if (this.filtro.value != undefined) {
          let filtro = this.filtro.value;
					if (filtro.de) {
						var de = new Date(filtro.de + 'T00:00:00.000');
						list = list.filter(x => x.dataMovimento >= de);
					}

					if (filtro.ate) {
						var ate = new Date(filtro.ate + 'T00:00:00.000');
						list = list.filter(x => x.dataMovimento <= ate);
					}

					if (!filtro.de && !filtro.ate && filtro.dataHora) {
						var data = this.datePipe.transform(filtro.dataHora, 'dd/MM/yyyy');
						list = list.filter(x => this.datePipe.transform(x.dataMovimento, 'dd/MM/yyyy') == data);
					}

					if (filtro.origem?.trim()) {
						list = list.filter(x => x.origem == filtro?.origem
              || filtro.origem?.includes(x.origem)
              || x.origem.includes(filtro.origem ?? ''));
					}

					if (filtro.destino?.trim()) {
						list = list.filter(x => x.destino == filtro?.destino
              || filtro.destino?.includes(x.destino)
              || x.destino.includes(filtro.destino ?? ''));
					}

					if (filtro?.tipoOrigem?.trim()) {
						list = list.filter(x => x.tipoOrigem == filtro?.tipoOrigem);
					}

					if (filtro?.tipoDestino?.trim()) {
						list = list.filter(x => x.tipoDestino == filtro?.tipoDestino);
					}

					if (filtro?.nomeArquivo?.trim()) {
						list = list.filter(x => x.nomeArquivo == filtro?.nomeArquivo
              || filtro.nomeArquivo?.includes(x.nomeArquivo)
              || x.nomeArquivo.includes(filtro.nomeArquivo ?? ''));
					}
					if (filtro?.criterio?.trim()) {
						list = list.filter(x => x.criterio == filtro?.criterio);
					}
          this.list.next(list);
					return list;
				}

				this.list.next(list)
				return list;
			}));
	}
}
