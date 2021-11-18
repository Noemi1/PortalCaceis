import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ResetPassword } from 'src/app/models/account.model';
import { AlertService } from 'src/app/parts/alert/alert.service';
import { AccountService } from 'src/app/services/account.service';
import { Password } from 'src/app/utils';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {
	faChevronLeft = faChevronLeft;

	resetSenha: ResetPassword = new ResetPassword;
	loading = false;
	erro: string = '';

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService,
		private alertService: AlertService,
		public passwordUtils: Password,
		private accountService: AccountService
	) { }

	ngOnInit() {
		this.resetSenha.token = this.route.snapshot.queryParams['token'];
		// remove token from url to prevent http referer leakage

		// this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

		if (this.resetSenha.token == '' || this.resetSenha.token == undefined) {
			this.router.navigate(['account', 'acessar']);
			this.toastr.warning('Token de validação inválido')
		}
	}

	ngAfterViewInit(): void {
		this.passwordUtils.togglePassword();
	}
	onSubmit(form: NgForm) {
		this.loading = true;

		// stop here if form is invalid
		if (form.invalid) {
			this.loading = false;
			this.erro = 'As senhas não são iguais ou estão inválidas.'
			return;
		}
		if (!this.passwordUtils.validate(undefined, this.resetSenha.password)
			|| !this.passwordUtils.validate(undefined, this.resetSenha.confirmPassword)) {
			this.toastr.error('A senha deve conter 8 dígitos, entre eles letras maiúsculas, letras minúsculas e números');
			this.erro = 'A senha deve conter 8 dígitos, entre eles letras maiúsculas, letras minúsculas e números';
			this.loading = false;
			return;
		}

		if (this.resetSenha.password != this.resetSenha.confirmPassword) {
			this.toastr.error('As senhas não são iguais');
			this.erro = 'As senhas não são iguais';
			this.loading = false;
			return;
		}

		this.accountService.resetPassword(this.resetSenha).subscribe(
			res => {
				this.toastr.success('Senha alterada com sucesso!');
				this.router.navigate(['account', 'acessar'])
			},
			(err: HttpErrorResponse) => {
				if(err.error && err.error.message) {
					this.toastr.error(err.error.message);
				} 
				else if (typeof err == 'string') {
					this.toastr.error(err);
				}
				else {
					this.toastr.error('Não foi possível alterar sua senha')
				}
				this.loading = false
				console.error(err)
			}
		)

	}
}