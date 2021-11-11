export class SistemaResponse {
    id: number = 0;
    sigla: string = '';
    idEncrypted: string = '';
}

export class SistemaRequest {
    sigla: string = '';
}

export class SistemaUpdateRequest {
    id: number = 0;
    sigla: string = '';
}