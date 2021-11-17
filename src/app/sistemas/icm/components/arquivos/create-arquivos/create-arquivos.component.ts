import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Crypto } from 'src/app/utils/cryptojs';
import { Format } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';
import * as $ from 'jquery';
import { ArquivosService } from '../../../services/arquivos.service';
import { ArquivoRequest } from '../../../models/arquivo.model';
@Component({
	selector: 'app-create-arquivos',
	templateUrl: './create-arquivos.component.html',
	styleUrls: ['./create-arquivos.component.css']
})
export class CreateArquivosComponent implements OnInit, OnDestroy {

	modalOpen = false;
	objeto = new ArquivoRequest;
	erro: any[] = [];
	loading = false;
	subscription: Subscription[] = [];
	constructor(
		private router: Router,
		public arquivosService: ArquivosService,
		private toastr: ToastrService,
		private modal: ModalOpen,
		public format: Format,
		private crypto: Crypto
	) {
		var getOpen = this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});
		this.subscription.push(getOpen)
		this.objeto.acessoTipo_Origem_Id = 1;
	}

	ngOnInit(): void {
		setTimeout(() => {
			this.modal.setOpen(true);
		}, 200);
	}
	ngOnDestroy(){
		this.subscription.forEach(subs => {
			subs.unsubscribe()
		});
	}

	voltar() {
		this.modal.setOpen(false);
		setTimeout(() => {
			this.router.navigate(['./icm/arquivos']);
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
		
		this.objeto.nome = this.objeto.nome.trim();
		this.objeto.caminhoDestino = this.objeto.caminhoDestino.trim();
		this.objeto.caminhoOrigem = this.objeto.caminhoOrigem.trim();
		this.objeto.descricao = this.objeto.descricao.trim();

		this.arquivosService.create(this.objeto as ArquivoRequest)
			.toPromise()
			.then(res => {
				this.toastr.success('Operação realizada com sucesso!!');
				res.idEncrypted = this.crypto.encrypt(res.id);
				this.arquivosService.list.value.push(res);
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
