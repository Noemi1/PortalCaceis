import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { Format } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';
import { UsuarioFiltro } from '../../../models/usuario.model';

@Component({
	selector: 'app-filtrar-usuarios',
	templateUrl: './filtrar-usuarios.component.html',
	styleUrls: ['./filtrar-usuarios.component.css']
})
export class FiltrarUsuariosComponent implements OnInit {

	modalOpen = false;
	filtro: UsuarioFiltro = new UsuarioFiltro;
	erro: any[] = [];
	loading = false;
	subscription: Subscription[] = [];

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private modal: ModalOpen,
		public format: Format,
		public accountService: AccountService,
	) {
		var getOpen = this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});
		this.accountService.filtro.subscribe(res => {
			this.filtro = res ?? new UsuarioFiltro;
		})
		this.subscription.push(getOpen)
	}

	ngOnInit(): void {
		setTimeout(() => {
			this.modal.setOpen(true);
		}, 200);
		this.toastr.show('Filtro aplicado', undefined, { timeOut: 8000000000, extendedTimeOut: 1000000 })
	}

	ngOnDestroy() {
		this.subscription.forEach(subs => {
			subs.unsubscribe()
		});
	}

	voltar() {
		this.modal.setOpen(false);
		setTimeout(() => {
			this.router.navigate(['./corp/accounts']);
		}, 200);
	}

	filtrar(form: NgForm) {
		if (
			!this.filtro.nome
			&& !this.filtro.email
			&& !this.filtro.documento
			&& !this.filtro.cadastradoPor_Nome
			&& !this.filtro.cadastradoPor_Email
			&& this.filtro.status == undefined
			&& !this.filtro.de
			&& !this.filtro.ate
			&& !this.filtro.dataCadastro
		) {
			this.accountService.filtro.next(undefined);
		} else {
			this.accountService.filtro.next(this.filtro);
		}

		this.aplicarFiltro()
	}

	limparFiltro() {
		this.accountService.filtro.next(undefined);
		this.aplicarFiltro();
	}

	aplicarFiltro() {
		this.loading = true;
		this.accountService.getList().toPromise().then(
			res => {
				this.loading = false;
				this.voltar()
			},
			err => {
				this.toastr.error('Não foi possível carregar a listagem');
				this.loading = false;
			}
		)

	}

}
