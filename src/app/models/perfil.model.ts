export class PerfilResponse {
    id: number = 0;
    idEncrypted: string = '';
    tipo: string = '';
    sistema: string = '';
    perfilAcessos: PerfilAcessoResponse[] = [];
}

export class PerfilAcessoResponse {
    id: number = 0;
    controllerPath_Id: number = 0;
    path: string = '';
    descricao: string = '';
    httpMethod: string = '';
}

export class PerfilRequest {
    tipo: string = '';
    sistema_Id = '';
    accessContollers_Id: number[] = []
}

export class PerfilUpdateRequest {
    tipo: string = '';
    acessos: AcessosRequest[] = []
}

export class AcessosRequest {
    perfilAcesso_Id: number = 0;
    perfil_Id: number = 0;
    controllerPath_Id: number = 0;
    status: string = '';
}