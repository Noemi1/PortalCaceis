import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ArquivoFiltro } from 'src/app/sistemas/icm/models/arquivo.model';
import { ArquivosService } from 'src/app/sistemas/icm/services/arquivos.service';
import { Format } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';

@Component({
	selector: 'app-filtrar-usuarios',
	templateUrl: './filtrar-usuarios.component.html',
	styleUrls: ['./filtrar-usuarios.component.css']
})
export class FiltrarUsuariosComponent implements OnInit {

	modalOpen = false;
	filtro: ArquivoFiltro = new ArquivoFiltro;
	erro: any[] = [];
	loading = false;
	subscription: Subscription[] = [];

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private modal: ModalOpen,
		public format: Format,
		public arquivosService: ArquivosService,
	) {
		var getOpen = this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});
		this.arquivosService.filtro.subscribe(res => {
			this.filtro = res ?? new ArquivoFiltro;
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
			&& !this.filtro.acessoTipo_Destino_Id
			&& !this.filtro.acessoTipo_Origem_Id
			&& !this.filtro.caminhoOrigem
			&& !this.filtro.caminhoDestino
			&& !this.filtro.de
			&& !this.filtro.ate
			&& !this.filtro.dataHora
		) {
			this.arquivosService.filtro.next(undefined);
		} else {
			this.arquivosService.filtro.next(this.filtro);
		}

		this.aplicarFiltro()
	}

	limparFiltro() {
		this.arquivosService.filtro.next(undefined);
		this.aplicarFiltro();
	}

	aplicarFiltro() {
		this.loading = true;
		this.arquivosService.getList().toPromise().then(
			res => {
				this.loading = false;
				this.voltar()
			},
			err => {
				this.toastr.error('Não foi possível carregar a listagem')
			}
		)

	}

}
