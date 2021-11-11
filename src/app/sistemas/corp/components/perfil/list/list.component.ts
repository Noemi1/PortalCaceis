import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faEllipsisV, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { PerfilResponse } from 'src/app/sistemas/corp/models/perfil.model';
import { PerfilService } from 'src/app/sistemas/corp/services/perfil.service';
import { Crypto } from 'src/app/utils/cryptojs';
import { SistemaService } from '../../../services/sistema.service';

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
	pageOfItems: PerfilResponse[] = [];
	selected?: any;

	constructor(
		public crypto: Crypto,
		public perfilService: PerfilService,
		private toastr: ToastrService,
		private sistemaService: SistemaService
	) {
		this.perfilService.list.subscribe(res => {
			this.pageOfItems = res;
		});
		this.sistemaService.getList().subscribe();
		this.perfilService.getListAcessos().subscribe();
	}

	ngOnInit() {
		this.perfilService.getList().subscribe(
			res => {
				this.perfilService.list.next(res);
				this.items = res;
				this.loading = false;
				this.pageOfItems = res;
			},
			(err: HttpErrorResponse) => {
				this.loading = false;
				this.toastr.error(err.message);
				this.perfilService.list.next([]);
				this.items = [];
			});
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
