import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterRequest } from 'src/app/models';
import { Password } from 'src/app/utils';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

	loading = false;
	register = new RegisterRequest;
	error = undefined;
	constructor(
		public password: Password
	) { }

	ngOnInit(): void {
	}
	
	ngAfterViewInit(): void {
		this.password.togglePassword();
	}

	onSubmit(form: NgForm) {
	}

}
