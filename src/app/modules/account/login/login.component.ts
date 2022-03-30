import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Password } from 'src/app/utils';
import { AccountRequest } from 'src/app/models/account.model';
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
		private toastr: ToastrService,
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
    this.erro = []

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
				error: (err) => {
					this.loading = false;
					console.error(err)
					this.erro = [];
          this.erro.push(err)
          this.toastr.error(err)

				},
			});
	}
}
