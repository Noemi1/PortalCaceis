export class OrdemJudicialResponse {
    id: number = 0;
    idEncrypted: string = '';
    tipoOrdem: string = '';
    tipoReu: string = '';
    documento: string = '';
    nomeReu: string = '';
    valor: number = 0;
    // cnpjBase: string = '';
    protocolo: string = '';
    dataInclusao: Date = new Date;
    status: string = '';
    status_Id: number = 0;
}

export class OrdemJudicial_Status_Response {
    id: number = 0;
    nome: string = '';
}

export class OrdemJudicial_TipoReu_Response {
    id: number = 0;
    nome: string = '';
}

export class OrdemJudicial_TipoOrdem_Response {
    id: number = 0;
    nome: string = '';
}