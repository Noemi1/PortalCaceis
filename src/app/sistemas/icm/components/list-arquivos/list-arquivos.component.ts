import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faEllipsisV, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Crypto } from 'src/app/utils/cryptojs';
import { ArquivoResponse } from '../../models/arquivo.model';
import { ArquivosService } from '../../services/arquivos.service';

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
	loading = false;
	items: Array<any> = [];
	pageOfItems: Array<ArquivoResponse> = [];
	selected?: any;

	constructor(
		private router: Router,
        private route: ActivatedRoute,
		private arquivosService: ArquivosService,
		public crypto: Crypto
	) { }

	ngOnInit() {
		this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}` }));

		this.arquivosService.getList().subscribe(res => {
			this.pageOfItems = res;
		});
		this.arquivosService.getTipos().subscribe();
	}

	onChangePage(pageOfItems: Array<any>) {
		// update current page of items
		this.pageOfItems = pageOfItems;
	}

	selectItem(item: any) {
		this.selected = this.selected && this.selected == item ? undefined : item;
	}

	unselectItem() {
		this.selected = undefined;
	}

	navigate(url: string[], queryParams: object) {
		this.router.navigate(url, 
			{ 
				queryParams: queryParams,
				relativeTo: this.route
			})
	}

}
