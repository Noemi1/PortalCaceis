import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faEllipsisV, faFilter, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Crypto } from 'src/app/utils/cryptojs';
import { ArquivoResponse } from '../../models/arquivo.model';
import { MovimentacoesResponse } from '../../models/movimentacoes.model';
import { ArquivosService } from '../../services/arquivos.service';
import { MovimentacoesService } from '../../services/movimentacoes.service';

export class FilterKeyValue{
	key: string = '';
	value: string = ''
}
@Component({
	selector: 'app-movimentacoes',
	templateUrl: './movimentacoes.component.html',
	styleUrls: ['./movimentacoes.component.css']
})
export class MovimentacoesComponent implements OnInit, OnDestroy {
	faChevronLeft = faChevronLeft;
	faFilter = faFilter;
	loading = true;
  items: Array<MovimentacoesResponse> = [];
	list: Array<MovimentacoesResponse> = [];
	filtroList:  FilterKeyValue[] = []
	subscriptions: Subscription[] = []

	constructor(
		public movimentacoesService: MovimentacoesService,
		public crypto: Crypto) {
			this.movimentacoesService.list.subscribe(res => {
        this.list = res;
        this.items = res;
      });

			let filtro = this.movimentacoesService.filtro.subscribe(res => {
				this.filtroList = []
				if(res != undefined) {
					for(var [ key, value ] of Object.entries(res)) {
						if (value != undefined && value != '' && key != 'id') {
							this.filtroList.push({ key, value})
						}
					}
				}
			})
			this.subscriptions.push(filtro);
		}

	ngOnInit() {
		let getList = this.movimentacoesService.getList().subscribe(
			res => {},
			err => {
				console.error(err);
			},
      () => this.loading = false
		);
		this.subscriptions.push(getList);
	}

	ngOnDestroy() {
		this.subscriptions.forEach(item => {
			item.unsubscribe();
		})
	}

	onChangePage(pageOfItems: Array<any>) {
		this.list = pageOfItems;
	}

}
