import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PerfilRequest } from 'src/app/models/perfil.model';
import { PerfilService } from 'src/app/services/perfil.service';
import { Crypto } from 'src/app/utils/cryptojs';
import { Format } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';

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
	constructor(
		private router: Router,
		public perfilService: PerfilService,
		private toastr: ToastrService,
		private modal: ModalOpen,
		public format: Format,
		private crypto: Crypto
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
			this.router.navigate(['./']);
		}, 200);
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
			});
		return true;
	}
}
