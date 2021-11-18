import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { Crypto } from 'src/app/utils/cryptojs';
import { ModalOpen } from 'src/app/utils/modal-open';
import { UsuarioResponse } from '../../../models/usuario.model';

@Component({
	selector: 'app-ativacao',
	templateUrl: './ativacao.component.html',
	styleUrls: ['./ativacao.component.css']
})
export class AtivacaoComponent implements OnInit {

	modalOpen = false;
	id: number = 0;
	desativar: boolean = false;
	subscription: Subscription[] = [];
	loading = false;
	obj: UsuarioResponse = new UsuarioResponse;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private crypto: Crypto,
		private modal: ModalOpen,
		private toastr: ToastrService,
		private accountService: AccountService
	) {
		if (this.route.snapshot.queryParams['id']) {
			let id = this.route.snapshot.queryParams['id'];
			this.id = this.crypto.decrypt(id);
		} else {
			this.voltar();
		}

		if (this.route.snapshot.routeConfig?.path == 'ativar') {
			this.desativar = false;
		} else if (this.route.snapshot.routeConfig?.path == 'desativar') {
			this.desativar = true;
		}
		var getOpen = this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});
		this.subscription.push(getOpen);

		this.accountService.get(this.id).toPromise().then(res => {
			this.obj = res;
			if (res.isVerified && this.route.snapshot.routeConfig?.path == 'ativar') {
				this.voltar();
				this.toastr.warning('Essa conta já está ativa');
			} else if (!res.isVerified && this.route.snapshot.routeConfig?.path == 'desativar') {
				this.voltar();
				this.toastr.warning('Essa conta já está inativa');
			} else {
				setTimeout(() => {
					this.modal.setOpen(true);
				}, 200);
			}
		});


	}


	ngOnInit(): void {
	}

	voltar() {
		this.modal.setOpen(false);
		setTimeout(() => {
			this.router.navigate(['./corp/accounts']);
		}, 200);
	}


	setStatus() {
		this.accountService.setStatusAccount(this.id, this.desativar).subscribe(
			res => {
				this.toastr.success('Operação concluída');
				this.voltar();
				this.loading = false;
				this.accountService.getList().subscribe();
			},
			(err: HttpErrorResponse) => {
				if (err.error && err.error.message) {
					this.toastr.error(err.error.message);
				} else {
					this.toastr.error('Erro ao concluir operação')
				}
				this.loading = false;
				this.voltar();
			},
		)
	}

}
