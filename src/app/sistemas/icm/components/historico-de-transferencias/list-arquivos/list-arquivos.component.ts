import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faEllipsisV, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Crypto } from 'src/app/utils/cryptojs';
import { ArquivoResponse } from '../../../models/arquivo.model';
import { ArquivosService } from '../../../services/arquivos.service';

@Component({
	selector: 'app-list-arquivos',
	templateUrl: './list-arquivos.component.html',
	styleUrls: ['./list-arquivos.component.css']
})
export class ListArquivosComponent implements OnInit {
	faChevronLeft = faChevronLeft;
	faPlus = faPlus;
	faEllipsisV = faEllipsisV;
	faTimes = faTimes;
	loading = true;
	items: Array<any> = [];
	pageOfItems: Array<ArquivoResponse> = [];
	selected?: any;

	constructor(
		private router: Router,
        private route: ActivatedRoute,
		public arquivosService: ArquivosService,
		public crypto: Crypto
	) { 
		this.arquivosService.list.subscribe();
	}

	ngOnInit() {

		this.arquivosService.getList().subscribe(res => {
			this.arquivosService.list.next(res);
			this.items = res;
			this.loading = false;
		});
		this.items = this.pageOfItems;
		this.arquivosService.getTipos().subscribe();
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
