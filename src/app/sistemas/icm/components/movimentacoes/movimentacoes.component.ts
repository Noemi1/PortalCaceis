import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faEllipsisV, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Crypto } from 'src/app/utils/cryptojs';
import { ArquivoResponse } from '../../models/arquivo.model';
import { MovimentacoesResponse } from '../../models/movimentacoes.model';
import { ArquivosService } from '../../services/arquivos.service';
import { MovimentacoesService } from '../../services/movimentacoes.service';

@Component({
	selector: 'app-movimentacoes',
	templateUrl: './movimentacoes.component.html',
	styleUrls: ['./movimentacoes.component.css']
})
export class MovimentacoesComponent implements OnInit {

	faChevronLeft = faChevronLeft;
	faPlus = faPlus;
	faEllipsisV = faEllipsisV;
	faTimes = faTimes;
	loading = true;
	items: Array<any> = [];
	pageOfItems: Array<MovimentacoesResponse> = [];
	selected?: any;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		public movimentacoesService: MovimentacoesService,
		public crypto: Crypto) { }

	ngOnInit() {
		this.movimentacoesService.getList().subscribe(res => {
			this.movimentacoesService.list.next(res);
			this.items = res;
			this.loading = false;
		});
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
