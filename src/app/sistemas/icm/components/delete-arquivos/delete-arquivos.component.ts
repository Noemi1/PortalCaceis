import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Crypto } from 'src/app/utils/cryptojs';
import { ModalOpen } from 'src/app/utils/modal-open';
import { ArquivoResponse } from '../../models/arquivo.model';
import { ArquivosService } from '../../services/arquivos.service';

@Component({
	selector: 'app-delete-arquivos',
	templateUrl: './delete-arquivos.component.html',
	styleUrls: ['./delete-arquivos.component.css']
})
export class DeleteArquivosComponent implements OnInit {
	modalOpen = false;
	objeto = new ArquivoResponse;
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
		});

	}

	ngOnInit(): void {
	}

	voltar() {
		this.modal.setOpen(false);
		setTimeout(() => {
			this.router.navigate(['./ICM/gestao-de-arquivos']);
		}, 200);
	}
	delete() {
		this.loading = true;
		this.arquivosService.delete(this.objeto.id)
			.toPromise()
			.then(res => {
				this.toastr.success('Operação realizada com sucesso!!');
				this.toastr.success('Sucesso');
				this.arquivosService.getList().subscribe();
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
