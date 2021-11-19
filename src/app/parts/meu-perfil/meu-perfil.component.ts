import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
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
	account: AccountResponse = new AccountResponse;
	erro: any[] = [];
	constructor(
		public meuPerfil: MeuPerfilService,
		public accountService: AccountService,
		private toastr: ToastrService,
		public updatePassword: UpdatePasswordService,
	) {

		this.meuPerfil.get().subscribe(res => {
			this.modalOpen = res;
			setTimeout(() => {
				this.modalExists = res;
			}, 200);
		})
		this.accountService.getProfile()
		this.accountService.getAccount().subscribe(res => {
			this.account = res ?? new AccountResponse;
		});
		
		
		this.account = this.accountService.accountValue ?? new AccountResponse;
		
	} 

	ngOnInit(): void {
		
	}

	voltar(){
		this.modalExists = false;
		setTimeout(() => {
			this.modalOpen = false;
			this.meuPerfil.set(false)
			this.resetar();
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
		if(this.account.id != 0 && this.account.userLogado.email.trim() != '') {
			this.accountService.updateProfile(this.account.userLogado).subscribe(
				res => {
					this.toastr.success('Dados atualizados');
					this.loading = false;
					this.accountService.getProfile();

					var list = this.accountService.list.value;
					var itemList = this.accountService.list.value.find(x => x.id == this.account.id);
					var index = this.accountService.list.value.findIndex(x => x.id == this.account.id);
					
					if(index != -1 && itemList != undefined) {
						itemList.nome = res.nome;
						itemList.email = res.email;
						itemList.documento = res.documento;
						list[index] = itemList;
						this.accountService.list.next(list);
					}
					this.voltar();

				},
				err => {
					console.error(err);
					this.toastr.error(err);
					this.loading = false;
				}
			)
		} else {
			return;
		}

  
	}

	resetar() {
		this.account = this.accountService.accountValue ?? new AccountResponse;
	}
	
}
