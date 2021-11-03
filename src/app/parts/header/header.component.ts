import { Component, OnInit } from '@angular/core';
import { faBars, faCircle, faCog, faSignOutAlt, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css', './grey.component.css']
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

	faCircle = faCircle;
	faSignOutAlt = faSignOutAlt;
	faUser = faUser;
	faCog = faCog;
	faBars = faBars;
	faTimes = faTimes;
	constructor() { }

	ngOnInit(): void {
	}

}
