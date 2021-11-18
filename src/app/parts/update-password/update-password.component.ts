import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ResetPassword } from 'src/app/models/account.model';
import { AccountResponse } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { Password } from 'src/app/utils';
import { ModalOpen } from 'src/app/utils/modal-open';
import { MeuPerfilService } from '../meu-perfil/meu-perfil.service';
import { UpdatePasswordService } from './update-password.service';

@Component({
	selector: 'app-update-password',
	templateUrl: './update-password.component.html',
	styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit, AfterViewInit {

	faChevronLeft = faChevronLeft;
	modalOpen = false;
	modalExists = false;
	loading = false;
	resetSenha: ResetPassword = new ResetPassword;
	erro: any[] = [];
  
	constructor(
		public resetPassword: UpdatePasswordService,
		public accountService: AccountService,
		public passwordUtils: Password,
		private meuPerfil: MeuPerfilService,
		private toastr: ToastrService,
		private router: Router,
	) {
		this.resetPassword.get().subscribe(res => {
			this.modalOpen = res;
			setTimeout(() => {
				this.modalExists = res;
			}, 200);
		})
	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this.passwordUtils.togglePassword();
	}

	voltar(){
		this.modalExists = false;
		setTimeout(() => {
			this.modalOpen = false;
			this.resetPassword.set(false);
			this.resetSenha = new ResetPassword;
		}, 200)
	}

	update(form: NgForm){
		if(form.invalid) {
			for(var erro in form.errors) {
				this.erro.push(erro)
				this.toastr.error(erro);
			}
			return;
		}
	}

	onSubmit(form: NgForm) {
		this.loading = true;

		// stop here if form is invalid
		if (form.invalid) {
			this.loading = false;
			for(let erro in form.errors) {
				this.erro.push(erro);
				this.toastr.error(erro)
			}
		}
		if (!this.passwordUtils.validate(undefined, this.resetSenha.password)
			|| !this.passwordUtils.validate(undefined, this.resetSenha.confirmPassword)) {
			
			this.erro.push('A senha deve conter 8 dígitos, entre eles letras maiúsculas, letras minúsculas e números');
			this.toastr.error('A senha deve conter 8 dígitos, entre eles letras maiúsculas, letras minúsculas e números');
			this.loading = false;
			return;
		}

		if (this.resetSenha.password != this.resetSenha.confirmPassword) {
			this.toastr.error('As senhas não são iguais');
			this.erro.push('As senhas não são iguais');
			this.loading = false;
			return;
		}

		this.accountService.updatePassword(this.resetSenha).subscribe(
			res => {
				this.resetPassword.set(false);
				this.meuPerfil.set(false);
				this.voltar();
				this.toastr.success('Senha alterada');
				this.router.navigate(['account', 'acessar'])
				this.loading = false;
			}, 
			err => {
				this.toastr.error(err)
				console.error(err)
				this.loading = false;
			}
		)

		this.loading = true;

	}
	
}
