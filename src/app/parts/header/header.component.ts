import { Component, HostListener, OnInit } from '@angular/core';
import { faBars, faCircle, faCog, faSignOutAlt, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import * as $ from 'jquery';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	faCircle = faCircle;
	faCog = faCog;
	faUser = faUser;
	faSignOutAlt = faSignOutAlt;
	faTimes = faTimes;
	faBars = faBars;
	menuOpen = false;
	isMobile = false;

	constructor() { }

	ngOnInit(): void {
		this.getWindowSize();
	
	}
	logout() {

	}

	toggleMenu() {
		if (this.isMobile) {
			this.menuOpen = !this.menuOpen;
		}
		console.log(this.isMobile)
		console.log(this.menuOpen)
	}

	@HostListener('window:resize')
	getWindowSize() {
		var size = $(window).width() ?? 0;
		if(size < 600) {
			this.isMobile = true;
		} else {
			this.isMobile = false;
			this.menuOpen = false;
		}
	}

}
