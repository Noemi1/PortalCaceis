import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faBars, faBell, faChevronRight, faCircle, faCog, faEnvelope, faTimes, faTv, faUser } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { Menu } from 'src/app/utils';
import { MegaMenuItem } from 'primeng/api';  //required when using MegaMenu

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

	menuOpen = false;
	menuPin = false;

	items: MegaMenuItem[] = [
		{
			label: 'ICM',
			items: [
				[
					{ items: [
						{ label: 'Gestão de Arquivos', routerLink: '/ICM/gestao-de-arquivos' }
					] },
				]
			],
		},
	];

	constructor(
		public menu: Menu
	) {
		this.menu.getOpen().subscribe(open => {
			this.menuOpen = open ?? false;
		})
		this.menu.getPin().subscribe(pin => {
			this.menuPin = pin ?? false;
		})
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


}
