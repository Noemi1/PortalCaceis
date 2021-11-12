import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faEllipsisV, faFilter, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
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
export class MovimentacoesComponent implements OnInit {
	faChevronLeft= faChevronLeft;
	faFilter = faFilter;
	loading = true;
	items: Array<any> = [];
	pageOfItems: Array<MovimentacoesResponse> = [];
	selected?: any;
	filtroList:  FilterKeyValue[] = []

	constructor(
		public movimentacoesService: MovimentacoesService,
		public crypto: Crypto) { 
			this.movimentacoesService.list.subscribe(res => {
				console.log(res)
			})
			this.movimentacoesService.filtro.subscribe(res => {
				this.filtroList = []
				if(res != undefined) {
					for(var [ key, value ] of Object.entries(res)) {
						if (value != undefined && value != '' && key != 'id') {
							this.filtroList.push({ key, value})
						}
					}
				}
			})
		}

	ngOnInit() {
		this.movimentacoesService.getList().subscribe(
			res => {
				this.movimentacoesService.list.next(res);
				this.items = res;
				this.loading = false;
			}, 
			err => {
				this.loading = false;
				this.movimentacoesService.list.next([]);
				console.error(err)
			}
		);
		this.items = this.pageOfItems;
	}

	onChangePage(pageOfItems: Array<any>) {
		this.pageOfItems = pageOfItems;
	}

	selectItem(item: any) {
		this.selected = this.selected && this.selected == item ? undefined : item;
	}

	unselectItem() {
		this.selected = undefined;
	}

}
