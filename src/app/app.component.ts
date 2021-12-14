import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './services/account.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	isLoggedIn = false
	constructor(
		public accountService: AccountService,
		private router: Router
	){
		this.accountService.isLoggedIn.subscribe(res => {
			this.isLoggedIn = res;
		})

	}
	ngOnInit(): void {
	}
}
