import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PerfilRequest } from 'src/app/sistemas/corp/models/perfil.model';
import { PerfilService } from 'src/app/sistemas/corp/services/perfil.service';
import { Crypto } from 'src/app/utils/cryptojs';
import { Format } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';
import { SistemaService } from '../../../services/sistema.service';
import * as $ from 'jquery';
import { AcessoResponse } from '../../../models/acessos.model';
@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

	modalOpen = false;
	objeto = new PerfilRequest;
	erro: any[] = [];
	loading = false;
	subscription: Subscription[] = [];
	selected?: any;

	constructor(
		private router: Router,
		public perfilService: PerfilService,
		private toastr: ToastrService,
		private modal: ModalOpen,
		public format: Format,
		private crypto: Crypto,
		public sistemaService: SistemaService
	) {
		var getOpen = this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});
		var listAcessos = this.perfilService.listAcessos.subscribe();
		var listSistemas = this.sistemaService.list.subscribe();

		this.subscription.push(getOpen);
		this.subscription.push(listAcessos);
		this.subscription.push(listSistemas);
		this.objeto.sistema_Id = 0;
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
			this.router.navigate(['./corp/perfil']);
		}, 200);
	}
	toggleCheckbox(item: AcessoResponse) {
		item.checked = !item.checked;
		if(item.checked) {
			this.objeto.accessControllers_Id.push(item.id)
		} else {
			var index = this.objeto.accessControllers_Id.findIndex(x => x == item.id);
			if(index != -1) {
				this.objeto.accessControllers_Id.splice(index, 1)
			}
		}
	}

	create(form: NgForm) {
		this.loading = true;
		if (form.errors) {
			this.erro.push('O formulário está inválido!');
			this.toastr.error('O formulário está inválido!');
			console.error(form.errors);
			this.loading = false;
			return false;
		}
		this.erro = [];
		this.perfilService.create(this.objeto as PerfilRequest)
			.toPromise()
			.then(res => {
				this.toastr.success('Operação realizada com sucesso!!');
				res.idEncrypted = this.crypto.encrypt(res.id);
				this.perfilService.list.value.push(res);
				this.loading = false;
				this.voltar();
			})
			.catch((err: HttpErrorResponse) => {
				console.error('Erro:', err)
				this.loading = false;
				var oi  = typeof(err) 
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
				} else if (typeof(err) == 'string') {
					this.erro.push(err)
					this.toastr.error(err);
				} else {
					this.toastr.error('Erro');
				}
			});
		return true;
	}
}
