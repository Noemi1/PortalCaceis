import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { finalize, first } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
	faChevronLeft = faChevronLeft;

	loading = false;
	document: string = '';
	erro: string = '';

	constructor(
		private toastr: ToastrService,
		private accountService: AccountService,
		private router: Router
	) { }

	ngOnInit(): void {
	}
	onSubmit(form: NgForm) {
		this.loading = true;
  
		// reset alerts on submit
		this.toastr.clear();
  
		// stop here if form is invalid
		if (form.invalid) {
			this.erro = 'Dados inválidos';
			return;
		}
    
		this.loading = true;
		this.toastr.clear();
		this.accountService.forgotPassword(this.document).subscribe({
			next: () => {
				this.toastr.success('Verifique seu e-mail e siga as instruções passadas para resetar sua senha.');
				this.loading = false;
				this.router.navigate(['account/acessar']);
			},
			error: (err: HttpErrorResponse) => {
				if(err.error && err.error.message) {
					this.toastr.error(err.error.message);
				}
				else if (typeof err == 'string') {
					this.toastr.error(err);
				}
				 else {
					this.toastr.error('Não foi possível concluir a operação')
				}
				this.loading = false
				console.error(err)
			}
		});
  }
}
