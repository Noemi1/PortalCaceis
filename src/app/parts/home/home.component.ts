import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Menu } from 'src/app/utils/menu';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	menuOpen = false;
	menuPin = false;
	constructor(
		public menu: Menu,
		public modal: ModalOpen,
		private accountService: AccountService
	) { 
		this.menu.getOpen().subscribe(res => this.menuOpen = res || false);
		this.menu.getPin().subscribe(res => this.menuPin = res || false);
		this.modal.openSubject.subscribe()
	}

	ngOnInit(): void {

	}

}
