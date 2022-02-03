import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfigService } from 'src/app/services/app-config.service';
import { Crypto } from 'src/app/utils/cryptojs';
import { SistemaRequest, SistemaResponse, SistemaUpdateRequest } from '../models/sistema.model';

@Injectable({
	providedIn: 'root'
})
export class SistemaService {

  url = "";
	loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	list: BehaviorSubject<SistemaResponse[]> = new BehaviorSubject<SistemaResponse[]>([]);

	constructor(
		private http: HttpClient,
		private crypto: Crypto,
    private appConfigService: AppConfigService
	) {
    this.appConfigService.appConfig.subscribe(res => {
      this.url = res.apiBaseUrl;
    });
   }


	getList() {
		return this.http.get<SistemaResponse[]>(this.url + '/sistema')
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
		return this.http.get<SistemaResponse>(this.url + `/sistema/getbyid?id=${id}`);
	}

	create(model: SistemaRequest) {
		return this.http.post<SistemaResponse>(this.url + `/sistema`, model);
	}

	edit(model: SistemaUpdateRequest) {
		return this.http.put<SistemaResponse>(this.url + `/sistema`, model);
	}

	delete(id: number) {
		return this.http.delete<any>(this.url + `/sistema?id=${id}`);
	}
}
