import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faBars, faBell, faChevronRight, faCircle, faCog, faEnvelope, faLock, faLockOpen, faTimes, faTv, faUser, faCogs, faSignOutAlt, faKey } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { Menu } from 'src/app/utils';
import { MegaMenuItem } from 'primeng/api';  //required when using MegaMenu
import { ModalOpen } from 'src/app/utils/modal-open';
import { AccountService } from 'src/app/services/account.service';
import { Inputsearch } from 'src/app/utils/search-input';

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

	items: MegaMenuItem[] = [];
	input: string = ''

	constructor(
		public menu: Menu,
		public modal: ModalOpen,
		public inputSearch: Inputsearch,
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
		this.inputSearch.search().subscribe();
		this.accountService.getAccount().subscribe(res => {
			if(res != undefined) {
				this.items = [];
				let siglas = res.sistemas.map(x => x.sigla.toLowerCase()) || []
				if (siglas.includes('icm')) {5
					this.items.push(
						{
							label: 'Cloud Transfer', items: [[
								{
									items: [
										{ label: 'Histórico de transferências', routerLink: '/icm/historico-de-transferencia' },
										{ label: 'Movimentações', routerLink: '/icm/movimentacoes' },
									]
								}
							]]
						});
				}
				if (siglas.includes('jud')) {
					this.items.push(
						{
							label: 'JUD', items: [[
								{
									items: [
										{ label: 'Link', routerLink: '/JUD' }
									]
								}]]
						})
				}
				if (siglas.includes('corp')) {
					this.items.push(
						{
							label: 'Sistema', items: [[
								{
									items: [
										{ label: 'Perfis', routerLink: '/corp/perfil' }
									]
								}]]
						})
				}
			} else {
				var oi = 'oi';
			}
			
		})
	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		$('body')
	}
	search(input: any){
		console.log(input)
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
