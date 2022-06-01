export class MovimentacoesResponse {
    id: number = 0;
    dataMovimento: Date = new Date;
    nomeArquivo: string = '';
    tipoOrigem: string = '';
    tipoDestino: string = '';
    origem: string = '';
    destino: string = '';
    criterio: string = '';
    idEncrypted: string = '';
}

export class MovimentacoesFiltro {
    dataHora?: Date;
    de?: Date;
    ate?: Date;
    dataMovimento?: Date;
    nomeArquivo?: string;
    tipoOrigem?: string;
    tipoDestino?: string;
    origem?: string;
    destino?: string;
    criterio?: string;
}
