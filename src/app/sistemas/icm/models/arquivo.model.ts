export class ArquivoRequest {
    nome: string = '';
    descricao: string = '';
    caminhoOrigem: string = '';
    caminhoDestino: string = '';
    acessoTipo_Origem_Id: number = undefined as unknown as number;
    acessoTipo_Destino_Id: number = undefined as unknown as number;
    criterio_Id: number = undefined as unknown as number;
    usuarioCadastro_Id: number = 0;
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
    acessoTipo_Origem_Id: number = undefined as unknown as number;
    acessoTipo_Destino_Id: number = undefined as unknown as number;
    acessoTipoOrigem: string = '';
    acessoTipoDestino: string = '';
    criterio_Id: number = undefined as unknown as number;
    criterio: string = '';
}

export class ArquivoUpdateRequest {
	id: number = 0;
	nome: string = '';
	descricao: string = '';
	acessoTipo_Origem_Id: number = undefined as unknown as number;
	acessoTipo_Destino_Id: number = undefined as unknown as number;
	caminhoOrigem: string = '';
	caminhoDestino: string = '';
  criterio_Id: number = undefined as unknown as number;
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
    origem?: string;
    destino?: string;
    criterio_Id?: number;

}
