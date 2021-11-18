import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountResponse } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { UpdatePasswordService } from '../update-password/update-password.service';
import { MeuPerfilService } from './meu-perfil.service';

@Component({
	selector: 'app-meu-perfil',
	templateUrl: './meu-perfil.component.html',
	styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit {

	modalOpen = false;
	modalExists = false;
	loading = false;
	account = new AccountResponse;
	erro: any[] = [];
	constructor(
		public meuPerfil: MeuPerfilService,
		public accountService: AccountService,
		private toastr: ToastrService,
		public resetPassword: UpdatePasswordService,
	) {

		this.meuPerfil.get().subscribe(res => {
			this.modalOpen = res;
			setTimeout(() => {
				this.modalExists = res;
			}, 200);
		})
		
		this.account = this.accountService.accountValue ?? new AccountResponse;
		
	}

	ngOnInit(): void {
	}

	voltar(){
		this.modalExists = false;
		setTimeout(() => {
			this.modalOpen = false;
			this.meuPerfil.set(false)
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

		this.accountService.updateProfile(this.account.userLogado).subscribe(
			res => {
				this.toastr.success('Dados atualizados');
				this.loading = false;
				this.accountService.getProfile();
			},
			err => {
				console.error(err);
				this.toastr.error(err);
				this.loading = false;
			}
		)
  
	}

	resetar() {
		this.account = this.accountService.accountValue ?? new AccountResponse;
	}
	
}
