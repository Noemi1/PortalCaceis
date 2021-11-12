export class MovimentacoesResponse {
    id: number = 0;
    dataHora: Date = new Date;
    nome: string = '';
    movimento_Tipo: string = '';
    caminho: string = '';
    idEncrypted: string = '';
}

export class MovimentacoesFiltro {
    dataHora: Date | string = '';
    nome?: string;
    movimento_Tipo?: string;
    caminho?: string;
    de: Date | string = '';
    ate: Date | string= '';
}