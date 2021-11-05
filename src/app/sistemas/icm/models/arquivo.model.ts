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
}

export class ArquivoAcessoTipoResponse
{
    id: number = 0;
    nome: string = '';
}