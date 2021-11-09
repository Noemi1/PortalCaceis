import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PerfilUpdateRequest } from 'src/app/models/perfil.model';
import { PerfilService } from 'src/app/services/perfil.service';
import { Crypto } from 'src/app/utils/cryptojs';
import { Format } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

	modalOpen = false;
	objeto: PerfilUpdateRequest = new PerfilUpdateRequest;
	erro: any[] = [];
	loading = false;
	loadingObject = true;
	id: number = 0;


	constructor(
		private router: Router,
		private route: ActivatedRoute,
		public perfilService: PerfilService,
		private toastr: ToastrService,
		private modal: ModalOpen,
		private crypto: Crypto,
		public format: Format
	) {
		this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});
		if (this.route.snapshot.queryParams['id']) {
			let id = this.route.snapshot.queryParams['id'];
			this.id = this.crypto.decrypt(id);
		} else {
			this.voltar();
		}

		this.perfilService.get(this.id).subscribe(res => {
			this.loadingObject = false;
			setTimeout(() => {
				this.modal.setOpen(true);
			}, 200);
			this.objeto = res as unknown as PerfilUpdateRequest;
			this.objeto.acessos = [];
		});

	}

	ngOnInit(): void {
	}
	ngOnDestroy(){
	}
	voltar() {
		this.modal.setOpen(false);
		setTimeout(() => {
			this.router.navigate(['./']);
		}, 200);

	}
	edit(form: NgForm) {
		this.loading = true;
		if (form.errors) {
			this.erro.push('O formulário está inválido!');
			this.toastr.error('O formulário está inválido!');
			console.error(form.errors);
			this.loading = false;
			return false;
		}

		this.perfilService.edit(this.objeto)
			.toPromise()
			.then(res => {
				this.toastr.success('Operação realizada com sucesso!!');

				this.perfilService.getList().subscribe();
				// this.perfilService.list.value.push(res);
				this.loading = false;
				this.voltar();
			})
			.catch((err: HttpErrorResponse) => {
				console.error('Erro:', err)
				this.toastr.error('Erro');
				this.loading = false;
				if(err.status == 400) {
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
