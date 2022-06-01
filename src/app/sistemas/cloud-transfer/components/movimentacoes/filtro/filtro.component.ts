import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Crypto } from 'src/app/utils/cryptojs';
import { Format } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';
import { MovimentacoesFiltro } from '../../../models/movimentacoes.model';
import { ArquivosService } from '../../../services/arquivos.service';
import { MovimentacoesService } from '../../../services/movimentacoes.service';

@Component({
	selector: 'app-filtro',
	templateUrl: './filtro.component.html',
	styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit, OnDestroy {

	modalOpen = false;
	filtro: MovimentacoesFiltro = new MovimentacoesFiltro;
	erro: any[] = [];
	loading = false;
	subscription: Subscription[] = [];

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private modal: ModalOpen,
		public format: Format,
		private movimentacoesService: MovimentacoesService,
		public arquivosService: ArquivosService
	) {
		var getOpen = this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});
		this.movimentacoesService.filtro.subscribe(res => {
			this.filtro = res ?? new MovimentacoesFiltro;
		})
		this.subscription.push(getOpen)
	 }

	ngOnInit(): void {
		setTimeout(() => {
			this.modal.setOpen(true);
		}, 200);
		this.toastr.show('Filtro aplicado', undefined,  {timeOut: 8000000000, extendedTimeOut: 1000000})
	}

	ngOnDestroy(){
		this.subscription.forEach(subs => {
			subs.unsubscribe()
		});
	}

	voltar() {
		this.modal.setOpen(false);
		setTimeout(() => {
			this.router.navigate(['./icm/historico-de-movimentacoes']);
		}, 200);
	}

	filtrar(){
		if(!this.filtro.nomeArquivo?.trim()
			&& !this.filtro.tipoOrigem?.trim()
			&& !this.filtro.tipoDestino?.trim()
			&& !this.filtro.origem?.trim()
			&& !this.filtro.destino?.trim()
			&& !this.filtro.criterio?.trim()
			&& !this.filtro.de
			&& !this.filtro.ate
			&& !this.filtro.dataHora
			)
		{
			this.movimentacoesService.filtro.next(undefined);
		} else {
			this.movimentacoesService.filtro.next(this.filtro);
		}

		this.aplicarFiltro()
	}

	limparFiltro(){
		this.movimentacoesService.filtro.next(undefined);
		this.aplicarFiltro();
	}

	aplicarFiltro(){
		this.loading = true;
		this.movimentacoesService.getList().toPromise().then(
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
