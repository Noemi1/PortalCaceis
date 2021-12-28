import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faEllipsisV, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Crypto } from 'src/app/utils/cryptojs';
import { OrdemJudicialResponse } from '../../models/ordem-judicial.model';
import { OrdemJudicialService } from '../../services/ordem-judicial.service';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	faChevronLeft= faChevronLeft;
	faFilter = faFilter;
	faEllipsisV = faEllipsisV;
	faTimes = faTimes;
	loading = true;
	items: Array<any> = [];
	pageOfItems: Array<OrdemJudicialResponse> = [];
	selected?: any;
	filtro = {}
	subscriptions: Subscription[] = []

	constructor(
		public ordemJudicialService: OrdemJudicialService,
		public crypto: Crypto,
	) {

			let list = this.ordemJudicialService.list.subscribe()
			let getList = this.ordemJudicialService.getList().subscribe(
        res => {
          this.loading = false
        },
        err => {
          this.loading = false
        },
      );
      this.subscriptions.push(list);
      this.subscriptions.push(getList);
  }

	ngOnInit(): void {
	}
	ngOnDestroy() {
		this.subscriptions.forEach(item => {
			item.unsubscribe();
		})
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
