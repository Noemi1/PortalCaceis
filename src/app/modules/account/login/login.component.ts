import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Password } from 'src/app/utils';
import { LoginRequest } from 'src/app/models/login.model';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

	login = new LoginRequest;
	loading = false;
	loginErro = undefined;

	constructor(
		private password: Password
	) { }

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this.password.togglePassword();
	}

	onSubmit(form: NgForm) {
	}
}
