export class ArquivoRequest {
    nome: string = '';
    descricao: string = '';
    caminhoOrigem: string = '';
    caminhoDestino: string = '';
    acessoTipo_Origem_Id: number = undefined as unknown as number;
    acessoTipo_Destino_Id: number = undefined as unknown as number;
    criterio_Id: number = undefined as unknown as number;
    usuarioCadastro_Id: number = 0;
    finalizacao_Id?: number = undefined as unknown as number;
}

export class ArquivoResponse {
    id: number = 0;
    idEncrypted: string = '';
    nome: string = '';
    descricao: string = '';
    caminhoOrigem: string = '';
    caminhoDestino: string = '';
    usuario: string = '';
    dataCadastro: Date = new Date;
    finalizacao: string = '';
    finalizacao_Id: number = undefined as unknown as number;
    acessoTipoOrigem: string = '';
    acessoTipo_Origem_Id: number = undefined as unknown as number;
    acessoTipoDestino: string = '';
    acessoTipo_Destino_Id: number = undefined as unknown as number;
    criterio_Id: number = undefined as unknown as number;
    criterio: string = '';
}

export class ArquivoUpdateRequest {
	id: number = 0;
	nome: string = '';
	descricao: string = '';
	finalizacao_Id: number = undefined as unknown as number;
	acessoTipo_Origem_Id: number = undefined as unknown as number;
	acessoTipo_Destino_Id: number = undefined as unknown as number;
	caminhoOrigem: string = '';
	caminhoDestino: string = '';
  criterio_Id: number = undefined as unknown as number;
}

export class ArquivoFinalizacao {
  id: number = 0;
  nome: string = '';
}
export class ArquivoAcessoTipoResponse {
  id: number = 0;
  nome: string = '';
}
export class ArquivoCriterioResponse {
    id: number = 0;
    nome: string = '';
}

export class ArquivoFiltro {
    dataCadastro: Date | string = '';
    de: Date | string = '';
    ate: Date | string= '';
    nome?: string;
    descricao?: string;
    usuario?: string;
    acessoTipo_Origem_Id?: number;
    acessoTipo_Destino_Id?: number;
    finalizacao_Id?: number;
    caminhoOrigem?: string;
    caminhoDestino?: string;
    criterio_Id?: number;
    filtrarPor: FiltroData = FiltroData.periodo;
}

export enum FiltroData {
  periodo = 'periodo',
  dataFixa = 'dataFixa'
}

