import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	isLoggedIn = false
	constructor(
		public accountService: AccountService
	){
		this.accountService.isLoggedIn.subscribe(res => {
			this.isLoggedIn = res;
		})

	}
	ngOnInit(): void {
	}
}
