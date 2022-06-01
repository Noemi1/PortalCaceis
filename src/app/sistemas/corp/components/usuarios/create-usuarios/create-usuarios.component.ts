import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { Password } from 'src/app/utils';
import { Crypto } from 'src/app/utils/cryptojs';
import { Format } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';
import { PerfilResponse } from '../../../models/perfil.model';
import { UsuarioRequest } from '../../../models/usuario.model';
import { PerfilService } from '../../../services/perfil.service';

@Component({
	selector: 'app-create-usuarios',
	templateUrl: './create-usuarios.component.html',
	styleUrls: ['./create-usuarios.component.css']
})
export class CreateUsuariosComponent implements OnInit {


	modalOpen = false;
	objeto = new UsuarioRequest;
	erro: any[] = [];
	loading = false;
	subscription: Subscription[] = [];
	constructor(
		public format: Format,
		public passwordUtils: Password,
		public perfilService: PerfilService,
		public accountService: AccountService,
		private router: Router,
		private crypto: Crypto,
		private modal: ModalOpen,
		private toastr: ToastrService,
	) {
		var getOpen = this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});
		this.subscription.push(getOpen)
	}

	ngOnInit(): void {
		setTimeout(() => {
			this.modal.setOpen(true);
		}, 200);
	}
	ngOnDestroy() {
		this.subscription.forEach(subs => {
			subs.unsubscribe()
		});
	}

	voltar() {
		this.modal.setOpen(false);
		setTimeout(() => {
			this.router.navigate(['./corp/accounts']);
		}, 200);
	}

	toggleCheckbox(item: PerfilResponse) {
		item.checked = !item.checked;
		if(item.checked) {
			this.objeto.perfis.push(item.id)
		} else {
			var index = this.objeto.perfis.findIndex(x => x == item.id);
			if(index != -1) {
				this.objeto.perfis.splice(index, 1)
			}
		}
	}

	create(form: NgForm) {
		this.loading = true;
		this.erro = [];
		if (form.invalid) {
			this.loading = false;
			for(let erro in form.errors) {
				this.erro.push(erro);
				this.toastr.error(erro)
			}
		}
		this.objeto.nome = this.objeto.nome.trim();
		this.objeto.documento = this.objeto.documento.trim();
		this.objeto.email = this.objeto.email.trim();

		this.accountService.createAccount(this.objeto)
			.toPromise()
			.then(res => {
				this.toastr.success('Operação realizada com sucesso!!');
				res.idEncrypted = this.crypto.encrypt(res.id);
				this.accountService.list.value.push(res);
				this.loading = false;
				this.voltar();
			})
			.catch((err: HttpErrorResponse) => {
				console.error('Erro:', err)
				this.toastr.error('Erro');
				this.loading = false;
				if (err.status == 400) {
					for (var [key, value] of Object.entries(err.error.errors)) {
						this.erro.push(value)
						let input = $(`#${this.format.first_lower(key)}`);
						input.removeClass('ng-valid').addClass('ng-invalid')
						input.parent().append(`
							<p class="error text-danger">
								${value}
							</p>`);
					}
				}
				if(err.error && err.error.message) {
					this.toastr.error(err.error.message);
				}
				else if (typeof err == 'string') {
					this.toastr.error(err);
				}
				 else {
					this.toastr.error('Não foi possível concluir a operação')
				}
			});
		return true;
	}

}
