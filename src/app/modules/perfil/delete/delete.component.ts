import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PerfilResponse } from 'src/app/models/perfil.model';
import { PerfilService } from 'src/app/services/perfil.service';
import { Crypto } from 'src/app/utils/cryptojs';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
	selector: 'app-delete',
	templateUrl: './delete.component.html',
	styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

	modalOpen = false;
	objeto = new PerfilResponse;
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
			this.objeto = res;
		});

	}

	ngOnInit(): void {
	}

	voltar() {
		this.modal.setOpen(false);
		setTimeout(() => {
			this.router.navigate(['./']);
		}, 200);
	}
	delete() {
		this.loading = true;
		this.perfilService.delete(this.objeto.id)
			.toPromise()
			.then(res => {
				this.toastr.success('Operação realizada com sucesso!!');
				this.perfilService.getList().subscribe();
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
