import { AcessoResponse } from "./acessos.model";

export class PerfilResponse {
    id: number = 0;
    idEncrypted: string = '';
    nome: string = '';
    sistema: string = '';
    perfilAcessos: AcessoResponse[] = [];
}

export class PerfilRequest {
    nome: string = '';
    sistema_Id:number = 0;
    accessControllers_Id: number[] = []
}

export class PerfilUpdateRequest {
    nome: string = '';
    acessos: AcessoResponse[] = []
}
