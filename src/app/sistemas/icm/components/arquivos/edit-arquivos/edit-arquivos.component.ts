import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Crypto } from 'src/app/utils/cryptojs';
import { ModalOpen } from 'src/app/utils/modal-open';
import * as $ from 'jquery'
import { Format } from 'src/app/utils/format';
import { ArquivoAcessoTipoResponse, ArquivoUpdateRequest } from '../../../models/arquivo.model';
import { ArquivosService } from '../../../services/arquivos.service';
import { Subscription } from 'rxjs';

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
	subscription: Subscription[] = [];
  tiposAcesso: ArquivoAcessoTipoResponse[] = [];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		public arquivosService: ArquivosService,
		private toastr: ToastrService,
		private modal: ModalOpen,
		private crypto: Crypto,
		public format: Format
	) {
		if (this.route.snapshot.queryParams['id']) {
			let id = this.route.snapshot.queryParams['id'];
			this.id = this.crypto.decrypt(id);
		} else {
			this.voltar();
		}

		let getOpen = this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});

    this.arquivosService.listTipos.subscribe(res => this.tiposAcesso = res);
    this.arquivosService.getTipos().subscribe();

		let get = this.arquivosService.get(this.id).subscribe(res => {
			this.loadingObject = false;
			setTimeout(() => {
				this.modal.setOpen(true);
			}, 200);
			this.objeto = res;
			this.objeto.acessoTipo_Origem_Id = 1;
		});


		this.subscription.push(getOpen);
		this.subscription.push(get);

	}

	ngOnInit(): void {
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

		this.arquivosService.update(this.objeto)
			.toPromise()
			.then(res => {
				this.toastr.success('Operação realizada com sucesso!!');
				this.arquivosService.getList().subscribe();
				this.loading = false;
				this.voltar();
			})
			.catch((err: HttpErrorResponse) => {
				console.error('Erro:', err)
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
					this.toastr.error('Não foi possível concluir a operação')
				}
			});
		return true;
	}
}
