import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Format } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';
import { ArquivoRequest } from '../../models/arquivo.model';
import { ArquivosService } from '../../services/arquivos.service';

@Component({
	selector: 'app-create-arquivos',
	templateUrl: './create-arquivos.component.html',
	styleUrls: ['./create-arquivos.component.css']
})
export class CreateArquivosComponent implements OnInit {

	modalOpen = false;
	objeto = new ArquivoRequest;
	erro: any[] = [];
	loading = false;
	constructor(
		private router: Router,
		public arquivosService: ArquivosService,
		private toastr: ToastrService,
		private modal: ModalOpen,
		public format: Format
	) {
		this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});
	}

	ngOnInit(): void {
		setTimeout(() => {
			this.modal.setOpen(true);
		}, 200);
	}

	voltar() {
		this.modal.setOpen(false);
		setTimeout(() => {
			this.router.navigate(['./ICM/gestao-de-arquivos']);
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

		this.arquivosService.create(this.objeto as ArquivoRequest)
			.toPromise()
			.then(res => {
				this.toastr.success('Operação realizada com sucesso!!');
				this.toastr.success('Sucesso');
				this.arquivosService.list.value.push(res);
				this.loading = false;
				this.voltar();
			})
			.catch((err: HttpErrorResponse) => {
				console.error('Erro:', err)
				this.toastr.error('Erro');
				this.toastr.error('Ocorreu um problema na operação. Tente mais tarde.');
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
