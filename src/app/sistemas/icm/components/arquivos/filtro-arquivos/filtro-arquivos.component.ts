import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Crypto } from 'src/app/utils/cryptojs';
import { Format } from 'src/app/utils/format';
import { ModalOpen } from 'src/app/utils/modal-open';
import { ArquivoFiltro } from '../../../models/arquivo.model';
import { ArquivosService } from '../../../services/arquivos.service';
import { MovimentacoesService } from '../../../services/movimentacoes.service';

@Component({
	selector: 'app-filtro-arquivos',
	templateUrl: './filtro-arquivos.component.html',
	styleUrls: ['./filtro-arquivos.component.css']
})
export class FiltroArquivosComponent implements OnInit, OnDestroy {

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
    this.subscription.push(getOpen);

		this.arquivosService.filtro.subscribe(res => {
			this.filtro = res ?? new ArquivoFiltro;
		});
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
			this.router.navigate(['./icm/arquivos']);
		}, 200);
	}

	filtrar(form: NgForm){
		if(
        !this.filtro.nome
        && !this.filtro.acessoTipo_Destino_Id
        && !this.filtro.acessoTipo_Origem_Id
        && !this.filtro.origem
        && !this.filtro.destino
        && !this.filtro.de
        && !this.filtro.ate
        && !this.filtro.dataCadastro
        && !this.filtro.criterio_Id
        && !this.filtro.usuario?.trim()
        && !this.filtro.descricao?.trim()
			)
		{
			this.arquivosService.filtro.next(undefined);
		} else {
			this.arquivosService.filtro.next(this.filtro);
		}

		this.aplicarFiltro()
	}

	limparFiltro(){
		this.arquivosService.filtro.next(undefined);
		this.aplicarFiltro();
	}

	aplicarFiltro(){
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
