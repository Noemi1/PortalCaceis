import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArquivoRequest, ArquivoResponse, ArquivoAcessoTipoResponse, ArquivoUpdateRequest, ArquivoFiltro, ArquivoCriterioResponse, ArquivoFinalizacao, ArquivoFiltroData } from '../models/arquivo.model';
import { map } from 'rxjs/operators';
import { Crypto } from 'src/app/utils/cryptojs';
import { DatePipe } from '@angular/common';
import { AppConfigService } from 'src/app/services/app-config.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArquivosService {
  url = "";
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  list: BehaviorSubject<ArquivoResponse[]> = new BehaviorSubject<ArquivoResponse[]>([]);
  listTipos: BehaviorSubject<ArquivoAcessoTipoResponse[]> = new BehaviorSubject<ArquivoAcessoTipoResponse[]>([]);
  listCriterios: BehaviorSubject<ArquivoCriterioResponse[]> = new BehaviorSubject<ArquivoCriterioResponse[]>([]);
  listFinalizacao: BehaviorSubject<ArquivoFinalizacao[]> = new BehaviorSubject<ArquivoFinalizacao[]>([]);
  filtro: BehaviorSubject<ArquivoFiltro | undefined> = new BehaviorSubject<ArquivoFiltro | undefined>(undefined);

  constructor(
    private http: HttpClient,
    private crypto: Crypto,
    private datePipe: DatePipe,
    private appConfigService: AppConfigService
  ) {
    this.appConfigService.appConfig.subscribe(res => {
      this.url = res.apiBaseUrl;
    });
  }

  getFinalizacao() {
    return this.http.get<ArquivoFinalizacao[]>(this.url + '/arquivofinalizacao')
      .pipe(map(list => {
        this.listFinalizacao.next(list);
      }));
  }

  getTipos() {
    return this.http.get<ArquivoAcessoTipoResponse[]>(this.url + '/arquivoacessotipo')
      .pipe(map(list => {
        this.listTipos.next(list);
      }));
  }

  getCriterios() {
    return this.http.get<ArquivoCriterioResponse[]>(this.url + '/arquivocriterio')
      .pipe(map(list => {
        this.listCriterios.next(list);
      }));
  }

  getTipo(id: number) {
    return this.http.get<ArquivoAcessoTipoResponse>(this.url + `/arquivoacessotipo/GetById?id${id}`);
  }

  getList() {
    return this.http.get<ArquivoResponse[]>(this.url + '/arquivo')
      .pipe(map(list => {
        list.forEach(item => {
          item.idEncrypted = this.crypto.encrypt(item.id);
          item.dataCadastro = new Date(new Date(item.dataCadastro).toDateString())
          return item;
        })
        if (this.filtro.value != undefined) {
          let filtro = this.filtro.value;

          if (filtro?.nome) {
            list = list.filter(x => x.nome == filtro?.nome
              || filtro.nome?.includes(x.nome)
              || x.nome.includes(filtro.nome ?? ''));
          }
          if (filtro?.usuario) {
            list = list.filter(x => x.usuario == filtro?.usuario
              || filtro.usuario?.includes(x.usuario)
              || x.usuario.includes(filtro.usuario ?? ''));
          }
          if (filtro?.descricao) {
            list = list.filter(x => x.descricao == filtro?.descricao
              || filtro.descricao?.includes(x.descricao)
              || x.descricao.includes(filtro.descricao ?? ''));
          }
          if (filtro?.finalizacao_Id) {
            list = list.filter(x => x.finalizacao_Id == filtro.finalizacao_Id);
          }

          if (filtro.filtrarPor == ArquivoFiltroData.periodo) {
            if (filtro.de) {
              var de = new Date(filtro.de + 'T00:00:00.000');
              list = list.filter(x => x.dataCadastro >= de);
            }

            if (filtro.ate) {
              var ate = new Date(filtro.ate + 'T00:00:00.000');
              list = list.filter(x => x.dataCadastro <= ate);
            }
          } else {
            if (filtro.dataCadastro) {
              var data = this.datePipe.transform(filtro.dataCadastro as string, 'dd/MM/yyyy');
              list = list.filter(x => this.datePipe.transform(x.dataCadastro, 'dd/MM/yyyy') == data);
            }
          }
          if (filtro?.acessoTipo_Origem_Id) {
            list = list.filter(x => x.acessoTipo_Origem_Id == filtro?.acessoTipo_Origem_Id);
          }

          if (filtro?.acessoTipo_Destino_Id) {
            list = list.filter(x => x.acessoTipo_Destino_Id == filtro?.acessoTipo_Destino_Id);
          }

          if (filtro.caminhoOrigem?.trim()) {
            list = list.filter(x => x.caminhoOrigem == filtro?.caminhoOrigem
              || filtro.caminhoOrigem?.includes(x.caminhoOrigem)
              || x.caminhoOrigem.includes(filtro.caminhoOrigem ?? ''));
          }

          if (filtro.caminhoDestino?.trim()) {
            list = list.filter(x => x.caminhoDestino == filtro?.caminhoDestino
              || filtro.caminhoDestino?.includes(x.caminhoDestino)
              || x.caminhoDestino.includes(filtro.caminhoDestino ?? ''));
          }

        }
        this.list.next(list);
        return list;
      }));
  }

  get(id: number) {
    return this.http.get<ArquivoResponse>(this.url + `/arquivo/getbyid?id=${id}`);
  }

  create(model: ArquivoRequest) {
    return this.http.post<ArquivoResponse>(this.url + `/arquivo`, model);
  }

  update(model: ArquivoUpdateRequest) {
    return this.http.put<ArquivoResponse>(this.url + `/arquivo`, model);
  }

  delete(id: number) {
    return this.http.delete<any>(this.url + `/arquivo?id=${id}`);
  }

  download(id: number): Observable<Blob> {
    return this.http.get(this.url + `/arquivo/getbyid?id=${id}`, { responseType: 'blob' });
  }

}
