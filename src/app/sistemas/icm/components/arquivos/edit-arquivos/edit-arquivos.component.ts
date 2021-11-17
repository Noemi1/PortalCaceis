import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Crypto } from 'src/app/utils/cryptojs';
import { ModalOpen } from 'src/app/utils/modal-open';
import * as $ from 'jquery'
import { Format } from 'src/app/utils/format';
import { ArquivoUpdateRequest } from '../../../models/arquivo.model';
import { ArquivosService } from '../../../services/arquivos.service';

@Component({
	selector: 'app-edit-arquivos',
	templateUrl: './edit-arquivos.component.html',
	styleUrls: ['./edit-arquivos.component.css']
})
export class EditArquivosComponent implements OnInit, OnDestroy {

	modalOpen = false;
	objeto: ArquivoUpdateRequest = new ArquivoUpdateRequest;
	erro: any[] = [];
	loading = false;
	loadingObject = true;
	id: number = 0;


	constructor(
		private router: Router,
		private route: ActivatedRoute,
		public arquivosService: ArquivosService,
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

		this.arquivosService.get(this.id).subscribe(res => {
			this.loadingObject = false;
			setTimeout(() => {
				this.modal.setOpen(true);
			}, 200);
			this.objeto = res;
			this.objeto.acessoTipo_Origem_Id = 1;
		});

	}

	ngOnInit(): void {
		this.arquivosService.listTipos.subscribe();
	}
	ngOnDestroy(){
		this.arquivosService.listTipos.subscribe().unsubscribe();
	}
	voltar() {
		this.modal.setOpen(false);
		setTimeout(() => {
			this.router.navigate(['./icm/arquivos']);
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
		
		this.objeto.nome = this.objeto.nome.trim();
		this.objeto.caminhoDestino = this.objeto.caminhoDestino.trim();
		this.objeto.caminhoOrigem = this.objeto.caminhoOrigem.trim();
		this.objeto.descricao = this.objeto.descricao.trim();
		


		this.arquivosService.edit(this.objeto)
			.toPromise()
			.then(res => {
				this.toastr.success('Operação realizada com sucesso!!');

				this.arquivosService.getList().subscribe();
				// this.arquivosService.list.value.push(res);
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
