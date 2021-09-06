import { Component, OnInit } from '@angular/core';
import { faBars, faBell, faChevronRight, faCircle, faCog, faEnvelope, faTimes, faTv, faUser } from '@fortawesome/free-solid-svg-icons';
import { Menu } from 'src/app/utils/menu';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css']
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
	constructor(
		public menu: Menu
	) { 
		this.menu.getOpen().subscribe(open => {
			this.menuOpen = open ?? false;
		})
	}

	ngOnInit(): void {
	}

	toggleMenu(){
		this.menu.setOpen(!this.menuOpen);		
		console.log(this.menu.getOpen().value)
	}

}
