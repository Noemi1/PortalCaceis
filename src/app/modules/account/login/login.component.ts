import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Password } from 'src/app/utils';
import { AccountRequest } from 'src/app/models/login.model';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Format } from 'src/app/utils/format';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

	login = new AccountRequest;
	loading = false;
	erro: any[] = [];
	submitted = false;

	constructor(
		private password: Password,
		private accountService: AccountService,
		private route: ActivatedRoute,
		private router: Router,
		private toastrService: ToastrService,
		private format: Format,
	) { }

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this.password.togglePassword();
	}

	onSubmit(form: NgForm) {
		this.submitted = true;
		this.loading = true;

		// stop here if form is invalid
		if (form.invalid) {
			return;
		}
		this.accountService
			.login(this.login)
			.subscribe({
				next: (res) => {
					const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
					this.router.navigateByUrl(returnUrl);
					this.loading = false;
				},
				error: (err: HttpErrorResponse) => {
					this.loading = false;
					console.error(err)
					if(err.status == 400) {
						for (var [key, value] of Object.entries(err.error.errors)) {
							this.erro.push(value)
							let input = $(`#${this.format.first_lower(key)}`);
							input.removeClass('ng-valid').addClass('ng-invalid')
							input.parent().append(`
								<p class="error text-danger">
									${value}
								</p>`);
						}

					} else {
						this.erro.push('Login inválido');
						this.toastrService.error('Login inválido');
					}
				},
			});
	}
}
