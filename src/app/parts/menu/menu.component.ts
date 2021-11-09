import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faBars, faBell, faChevronRight, faCircle, faCog, faEnvelope, faLock, faLockOpen, faTimes, faTv, faUser, faCogs, faSignOutAlt, faKey } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { Menu } from 'src/app/utils';
import { MegaMenuItem } from 'primeng/api';  //required when using MegaMenu
import { ModalOpen } from 'src/app/utils/modal-open';
import { AccountService } from 'src/app/services/account.service';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css', './grey.component.css']
})
export class MenuLateralComponent implements OnInit, AfterViewInit {
	faBars = faBars;
	faTimes = faTimes;
	faBell = faBell;
	faEnvelope = faEnvelope;
	faUser = faUser;
	faCog = faCog;
	faTv = faTv;
	faChevronRight = faChevronRight;
	faCircle = faCircle;
	faLock = faLock;
	faLockOpen = faLockOpen;
	faSignOutAlt = faSignOutAlt;
	faKey = faKey;

	menuOpen = false;
	menuPin = false;
	modalOpen = false;

	items: MegaMenuItem[] = [
		{
			label: 'Cloud Transfer',
			items: [
				[
					{ items: [
						// { label: 'Home', routerLink: '/ICM' },
						{ label: 'Histórico de transferências', routerLink: '/cloud-transfer/historico-de-transferencia' }
					] },
				],
			],
		},
		{
			label: 'JUD',
			items: [
				[
					{ items: [
						{ label: 'Link', routerLink: '/JUD' }
					] },
				]
			],
		},
		// {
		// 	label: 'Open Finance',
		// 	items: [
		// 		[
		// 			{ items: [
		// 				{ label: 'Link', routerLink: '/JUD' }
		// 			] },
		// 		]
		// 	],
		// },
	];

	constructor(
		public menu: Menu,
		public modal: ModalOpen,
		private accountService: AccountService
	) {
		this.menu.getOpen().subscribe(open => {
			this.menuOpen = open ?? false;
		})
		this.menu.getPin().subscribe(pin => {
			this.menuPin = pin ?? false;
		})
		this.modal.openSubject.subscribe(open => {
			this.modalOpen = open;
		});
	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		$('body')
	}
	

	toggleMenu() {
		this.menu.setOpen(!this.menuOpen);
	}

	togglePinMenu(){
		this.menu.setPin(!this.menuPin);
	}

	logout(){
		this.accountService.logout();
	}

}
