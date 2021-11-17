import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faEllipsisV, faFilter, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AccountResponse } from 'src/app/models/login.model';
import { ArquivosService } from 'src/app/sistemas/icm/services/arquivos.service';
import { Crypto } from 'src/app/utils/cryptojs';

@Component({
	selector: 'app-list-usuarios',
	templateUrl: './list-usuarios.component.html',
	styleUrls: ['./list-usuarios.component.css']
})
export class ListUsuariosComponent implements OnInit {
	faChevronLeft = faChevronLeft;
	faPlus = faPlus;
	faEllipsisV = faEllipsisV;
	faTimes = faTimes;
	faFilter = faFilter;
	loading = true;
	items: Array<any> = [];
	pageOfItems: Array<AccountResponse> = [];
	selected?: any;

	constructor(
		private router: Router,
        private route: ActivatedRoute,
		public arquivosService: ArquivosService,
		public crypto: Crypto
	) { }

	ngOnInit(): void {
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
