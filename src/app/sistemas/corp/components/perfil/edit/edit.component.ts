import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PerfilRequest, PerfilResponse, PerfilUpdateRequest } from 'src/app/sistemas/corp/models/perfil.model';
import { PerfilService } from 'src/app/sistemas/corp/services/perfil.service';
import { Crypto } from 'src/app/utils/cryptojs';
import { Format } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';
import { AcessoResponse } from '../../../models/acessos.model';
import { SistemaService } from '../../../services/sistema.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

	modalOpen = false;
	objeto: PerfilResponse = new PerfilResponse;
	erro: any[] = [];
	loading = false;
	loadingObject = true;
	id: number = 0;
	perfilAcessos = [];


	constructor(
		private router: Router,
		private route: ActivatedRoute,
		public perfilService: PerfilService,
		private toastr: ToastrService,
		private modal: ModalOpen,
		private crypto: Crypto,
		public format: Format,
		public sistemaService: SistemaService,

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

		this.perfilService.get(this.id).subscribe(perfil => {
			this.loadingObject = false;
			setTimeout(() => {
				this.modal.setOpen(true);
			}, 200);
			this.objeto = perfil;

			var idsAcessos = perfil.perfilAcessos.map(x => x.controllerPath_Id);
			this.perfilService.listAcessos.value.map(a => {
				a.checked = idsAcessos.includes(a.id);

				var item = this.objeto.perfilAcessos.find(x => x.controllerPath_Id == a.id)
				var index = this.objeto.perfilAcessos.findIndex(x => x.controllerPath_Id == a.id)
				if(item != undefined && index != -1) {
					item.checked = a.checked;
					item.excluido = false;
					item.controllerPath_Id = a.id;
					this.objeto.perfilAcessos[index] = item;
				};
			});
		});


	}

	ngOnInit(): void {
	}
	ngOnDestroy(){
	}
	voltar() {
		this.modal.setOpen(false);
		setTimeout(() => {
			this.router.navigate(['./corp/perfil']);
		}, 200);

	}
	toggleCheckbox(item: AcessoResponse) {
		item.checked = !item.checked;
		item.excluido = !item.checked;
		var itemNew = this.objeto.perfilAcessos.find(x => x.controllerPath_Id == item.id)
		var index = this.objeto.perfilAcessos.findIndex(x => x.controllerPath_Id == item.id)
		if(itemNew != undefined && index != -1) {
			itemNew.checked = item.checked;
			itemNew.excluido = !item.checked;
			this.objeto.perfilAcessos[index] = itemNew;
		}
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

		var obj = { nome: this.objeto.nome, acessos: this.objeto.perfilAcessos}

		this.perfilService.update(this.objeto.id, obj)
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
				
				if(err.error && err.error.message) {
					this.toastr.error(err.error.message);
				}
				else if (typeof err == 'string') {
					this.toastr.error(err);
				}
				 else {
					this.erro.push('Login inválido');
					this.toastr.error('Login inválido');
				}
			});
		return true;
	}
}
