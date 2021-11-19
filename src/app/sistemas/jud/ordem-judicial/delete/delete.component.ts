import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Crypto } from 'src/app/utils/cryptojs';
import { ModalOpen } from 'src/app/utils/modal-open';
import { OrdemJudicialService } from '../../services/ordem-judicial.service';

@Component({
	selector: 'app-delete',
	templateUrl: './delete.component.html',
	styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit, OnDestroy {

	modalOpen = false;
	objeto = {};
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
		
		let get = this.ordemJudicialService.get(this.id).subscribe(res => {
			this.loadingObject = false;
			setTimeout(() => {
				this.modal.setOpen(true);
			}, 200);
			this.objeto = res;
		});


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
	
	delete() {
		this.loading = true;
		this.ordemJudicialService.delete(this.objeto['id'])
			.toPromise()
			.then(res => {
				this.toastr.success('Operação realizada com sucesso!!');
				let getList = this.ordemJudicialService.getList().subscribe();
				this.subscription.push(getList)
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
