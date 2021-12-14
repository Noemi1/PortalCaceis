import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Crypto } from 'src/app/utils/cryptojs';
import { Format } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';
import { OrdemJudicialService } from '../../services/ordem-judicial.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {


	modalOpen = false;
	objeto = {};
	erro: any[] = [];
	loading = false;
	loadingObject = true;
	id: number = 0;
	subscription: Subscription[] = [];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		public ordemJudicialService: OrdemJudicialService,
		private toastr: ToastrService,
		private modal: ModalOpen,
		private crypto: Crypto,
		public format: Format
	) {
		var getOpen = this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});

		if (this.route.snapshot.queryParams['id']) {
			let id = this.route.snapshot.queryParams['id'];
			this.id = this.crypto.decrypt(id);
		} else {
			this.voltar();
		}

		var get = this.ordemJudicialService.get(this.id).subscribe(res => {
			this.loadingObject = false;
			setTimeout(() => {
				this.modal.setOpen(true);
			}, 200);
			this.objeto = res;
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
			this.router.navigate(['./jud/ordem-judicial']);
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

		this.ordemJudicialService.update(this.objeto)
			.toPromise()
			.then(res => {
				this.toastr.success('Operação realizada com sucesso!!');
				this.ordemJudicialService.getList().subscribe();
				this.loading = false;
				this.voltar();
			})
			.catch((err: HttpErrorResponse) => {
				console.error('Erro:', err)
				this.loading = false;
				
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