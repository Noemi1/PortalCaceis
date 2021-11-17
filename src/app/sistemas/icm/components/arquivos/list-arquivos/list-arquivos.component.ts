import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faEllipsisV, faFilter, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
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
	faFilter = faFilter;
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

	downloadArquivo(item: ArquivoResponse) {
		this.arquivosService.download(item.id).subscribe(
			res => {
				var newBlob = new Blob([res], { type: "application/pdf" });

				// IE doesn't allow using a blob object directly as link href
				// instead it is necessary to use msSaveOrOpenBlob
				// if (window.navigator && window.navigator.msSaveOrOpenBlob) {
				// 	window.navigator.msSaveOrOpenBlob(newBlob, fileName);
				// 	return;
				// }
				
				// For other browsers: 
				// Create a link pointing to the ObjectURL containing the blob.
				const data = window.URL.createObjectURL(newBlob);
				
				var link = document.createElement('a');
				link.href = data;
				link.download = item.nome;
				// this is necessary as link.click() does not work on the latest firefox
				link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
				
				setTimeout(function () {
					// For Firefox it is necessary to delay revoking the ObjectURL
					window.URL.revokeObjectURL(data);
					link.remove();
				}, 100);
			}
		)
	}
}
