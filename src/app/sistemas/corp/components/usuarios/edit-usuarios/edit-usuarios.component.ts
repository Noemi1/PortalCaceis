import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { Password } from 'src/app/utils';
import { Crypto } from 'src/app/utils/cryptojs';
import { Format } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';
import { PerfilRequest, PerfilResponse } from '../../../models/perfil.model';
import { UpdateUsuarioRequest, UsuarioRequest, UsuarioResponse } from '../../../models/usuario.model';
import { PerfilService } from '../../../services/perfil.service';

@Component({
	selector: 'app-edit-usuarios',
	templateUrl: './edit-usuarios.component.html',
	styleUrls: ['./edit-usuarios.component.css']
})
export class EditUsuariosComponent implements OnInit {



	modalOpen = false;
	objetoResponse = new UsuarioResponse;
	objeto = new UpdateUsuarioRequest;
	erro: any[] = [];
	loading = false;
	loadingObject = true;
	subscription: Subscription[] = [];
	id: number = 0;

	constructor(
		private crypto: Crypto,
		private modal: ModalOpen,
		private router: Router,
		private route: ActivatedRoute,
		private toastr: ToastrService,
		public format: Format,
		public passwordUtils: Password,
		public perfilService: PerfilService,
		public accountService: AccountService,
	) {
		var getOpen = this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});
		this.subscription.push(getOpen);

		if (this.route.snapshot.queryParams['id']) {
			let id = this.route.snapshot.queryParams['id'];
			this.id = this.crypto.decrypt(id);
		} else {
			this.voltar();
		}
		let getItem = this.accountService.get(this.id).subscribe(user => {

			this.loadingObject = false;

			setTimeout(() => {
				this.modal.setOpen(true);
			}, 200);

			this.objetoResponse = user;
			this.objeto.nome = user.nome;
			this.objeto.email = user.email;
			this.objeto.documento = user.documento;
			this.objeto.id = user.id;
			this.objeto.idEncrypted = user.idEncrypted;

			this.objeto.perfis = [];


			user.perfilAccounts.forEach(res => {
				this.objeto.perfis.push({
					id: res.id,
					perfil_Id: res.perfil_Id,
					excluido: false,
				});
			});
			this.perfilService.getList().toPromise().then(list => {
				list.map(item => {
					let index =  user.perfilAccounts.findIndex(x => x.perfil_Id == item.id);
					let newItem =  user.perfilAccounts.find(x => x.perfil_Id == item.id);

					if(newItem && index != -1) {
						item.checked = true
					}
					return item
				});
				this.perfilService.list.next(list)
				return list
			});


		});
		this.subscription.push(getItem);
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

		var obj = this.objeto.perfis.find(x => x.perfil_Id == item.id);
		var index = this.objeto.perfis.findIndex(x => x.perfil_Id == item.id)
		if(obj && index) {
			obj.excluido = !item.checked;
			this.objeto.perfis[index] = obj;
		} else {
			this.objeto.perfis.push({id: 0, perfil_Id: item.id, excluido: undefined})
		}
	}

	update(form: NgForm) {
		this.loading = true;
		this.erro = [];
		if (form.invalid) {
			this.loading = false;
			for (let erro in form.errors) {
				this.erro.push(erro);
				this.toastr.error(erro)
			}
		}

		this.objetoResponse.nome = this.objetoResponse.nome.trim();
		this.objetoResponse.documento = this.objetoResponse.documento.trim();
		this.objetoResponse.email = this.objetoResponse.email.trim();

		this.accountService.updateAccount(this.objeto)
			.toPromise()
			.then(res => {
				this.toastr.success('Operação realizada com sucesso!!');
				res.idEncrypted = this.crypto.encrypt(res.id);
				this.perfilService.getList().subscribe();
				this.accountService.getList().subscribe();
				this.loading = false;
				this.voltar();
			})
			.catch((err: HttpErrorResponse) => {
				console.error('Erro:', err)
				if (err.error && err.error.message) {
					this.toastr.error(err.error.message);
				} else {
					this.toastr.error('Erro');
				}
				this.loading = false;
				if (err.status == 400) {
					for (var [key, value] of Object.entries(err.error.errors)) {
						this.erro.push(value);
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
