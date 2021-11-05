import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalOpen } from 'src/app/utils/modal-open';
import { ArquivoRequest } from '../../models/arquivo.model';
import { ArquivosService } from '../../services/arquivos.service';

@Component({
	selector: 'app-edit-arquivos',
	templateUrl: './edit-arquivos.component.html',
	styleUrls: ['./edit-arquivos.component.css']
})
export class EditArquivosComponent implements OnInit {

	modalOpen = false;
	objeto = new ArquivoRequest;
	erro?: string;
	loading = false;

	constructor(
		private router: Router,
		public arquivosService: ArquivosService,
		private toastr: ToastrService,
		private modal: ModalOpen
	) { }

	ngOnInit(): void {
		setTimeout(() => {
			this.modalOpen = true;
		}, 200);
		this.arquivosService.listTipos.subscribe();

	}

	voltar() {
		this.modalOpen = false;
		setTimeout(() => {
			this.router.navigate(['./ICM/gestao-de-arquivos']);
		}, 200);
		this.modal.openSubject.next(false);

	}
	edit(form: NgForm) {
		this.loading = true;
		if (form.errors) {
			this.erro = 'O formulário está inválido!';
			this.toastr.error(this.erro);
			console.error(form.errors);
			this.loading = false;
			return false;
		}

		this.arquivosService.edit(this.objeto)
			.toPromise()
			.then(res => {
				this.toastr.success('Operação realizada com sucesso!!');
				this.toastr.success('Sucesso');
				this.arquivosService.list.value.push(res);
				this.loading = false;
				this.voltar();
			})
			.catch(err => {
				console.error('Erro:', err)
				this.toastr.error('Erro');
				this.toastr.error('Ocorreu um problema na operação. Tente mais tarde.');
				this.loading = false;
			});
		return true;

	}

}
