import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faEllipsisV, faFilter, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AccountResponse } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { ArquivosService } from 'src/app/sistemas/icm/services/arquivos.service';
import { Crypto } from 'src/app/utils/cryptojs';
import { PerfilService } from '../../../services/perfil.service';

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
		private perfilService: PerfilService,
		public accountService: AccountService,
		public crypto: Crypto,
	) {
		this.accountService.getList().subscribe(
			res => {
				this.loading = false;
				this.items = res;
			}
		)
    this.accountService.list.subscribe(res => this.items = res);
		this.items = this.pageOfItems;
		this.perfilService.getList().subscribe();
	}

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
