import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Crypto } from 'src/app/utils/cryptojs';
import { Format } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';
import { OrdemJudicialResponse } from '../../models/ordem-judicial.model';
import { OrdemJudicialService } from '../../services/ordem-judicial.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

	modalOpen = false;
	objeto = new OrdemJudicialResponse;
	erro: any[] = [];
	loading = false;
	subscription: Subscription[] = [];

	constructor(
		private router: Router,
		public ordemJudicialService: OrdemJudicialService,
		private toastr: ToastrService,
		private modal: ModalOpen,
		public format: Format,
		private crypto: Crypto
	) { 
		
		var getOpen = this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});
		this.subscription.push(getOpen)
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
			this.router.navigate(['./jud/ordem-judicial']);
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

		this.ordemJudicialService.create(this.objeto)
			.toPromise()
			.then(res => {
				this.toastr.success('Operação realizada com sucesso!!');
				res.idEncrypted = this.crypto.encrypt(res.id);
				this.ordemJudicialService.list.value.push(res);
				this.loading = false;
				this.voltar();
			})
			.catch((err: HttpErrorResponse) => {
				console.error('Erro:', err)
				this.toastr.error('Erro');
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
