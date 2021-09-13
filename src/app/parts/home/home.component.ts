import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/utils/menu';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	menuOpen = false;
	constructor(
		public menu: Menu
	) { 
		this.menu.getOpen().subscribe(res => this.menuOpen = res || false)
	}

	ngOnInit(): void {
	}

}
