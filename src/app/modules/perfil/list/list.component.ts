import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faEllipsisV, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PerfilAcessoResponse } from 'src/app/models/perfil.model';
import { PerfilService } from 'src/app/services/perfil.service';
import { Crypto } from 'src/app/utils/cryptojs';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	faChevronLeft = faChevronLeft;
	faPlus = faPlus;
	faEllipsisV = faEllipsisV;
	faTimes = faTimes;
	loading = true;
	items: Array<any> = [];
	pageOfItems: Array<PerfilAcessoResponse> = [];
	selected?: any;

	constructor(
		private router: Router,
        private route: ActivatedRoute,
		public crypto: Crypto,
		public perfilService: PerfilService
	) { }

	ngOnInit() {

		this.perfilService.getList().subscribe(res => {
			this.perfilService.list.next(res);
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
