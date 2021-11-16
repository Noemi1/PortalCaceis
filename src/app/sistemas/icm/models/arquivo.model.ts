export class ArquivoRequest {
    nome: string = '';
    descricao: string = '';
    caminhoOrigem: string = '';
    caminhoDestino: string = '';
    acessoTipo_Origem_Id: number = 0;
    acessoTipo_Destino_Id: number = 0;
    usuarioCadastro_Id: number = 0;
}

export class ArquivoResponse {
    id: number = 0;
    nome: string = '';
    descricao: string = '';
    caminhoOrigem: string = '';
    caminhoDestino: string = '';
    usuario: string = '';
    dataCadastro: Date = new Date;
    idEncrypted: string = '';
    acessoTipo_Origem_Id: number = 0;
    acessoTipo_Destino_Id: number = 0;
}

export class ArquivoUpdateRequest {
	id: number = 0;
	nome: string = '';
	descricao: string = '';
	acessoTipo_Origem_Id: number = 0;
	acessoTipo_Destino_Id: number = 0;
	caminhoOrigem: string = '';
	caminhoDestino: string = '';
}

export class ArquivoAcessoTipoResponse {
    id: number = 0;
    nome: string = '';
}

export class ArquivoFiltro {
    dataHora: Date | string = '';
    de: Date | string = '';
    ate: Date | string= '';
    nome?: string;
    acessoTipo_Origem_Id?: number;
    acessoTipo_Destino_Id?: number;
    caminhoOrigem?: string;
    caminhoDestino?: string;

}