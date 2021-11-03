import { Component, OnInit } from '@angular/core';
import { faBars, faBell, faChevronRight, faCircle, faCog, faEnvelope, faTimes, faTv, faUser } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { Menu } from 'src/app/utils';
import { MenuItem } from 'primeng/api';
import { MegaMenuItem } from 'primeng/api';  //required when using MegaMenu

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css', './grey.component.css']
})
export class MenuLateralComponent implements OnInit {
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

	items: MegaMenuItem[] = [
		{
			label: 'JUD',
			items: [
				[
					{ items: [
						{ label: 'item 1', routerLink: 'oi' }
					] },
					{ items: [
						{ label: 'item 2', routerLink: 'oi' }
					] },
					{ items: [
						{ label: 'item 3', routerLink: 'oi' }
					] },
					{ items: [
						{ label: 'item 4', routerLink: 'oi' }
					] },
				]
			],
		},
		{
			label: 'ICM',
			items: [
				[
					{ label: 'Link 1' }
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
	}

	ngOnInit(): void {
	}

	toggleMenu() {
		this.menu.setOpen(!this.menuOpen);
	}


	toggleSubmenu(item: any) {
		$(item).toggleClass('active')
		// $(item).find('.submenu').slideToggle(200)
		$(item).find('.submenu').toggleClass('active')

		if ($(item).hasClass('active')) {
			$(item).find('.submenu')
				.slideDown(300, function () {
					console.log('slideDown')
				}).delay(400, 'slideDown')
				.fadeIn(400, function () {
					console.log('fadeIn')
				});
		} else {
			$(item).find('.submenu')
				.slideUp(300, function () {
					console.log('slideUp')
				}).delay(400, 'slideUp')
				.fadeOut(400, function () {
					console.log('fadeOut')
				});
		}
		// $(item).find('.submenu').find('.menu__nav-link').each(function () {
		// 	if($(item).hasClass('active')) {
		// 		$(this).slideUp(300).delay(300).fadeIn(400);
		// 	} else {
		// 		$(this).slideDown(300).delay(300).fadeOut(400);
		// 	}
		// })

	}

}
