import { AcessoResponse } from "./acessos.model";

export class PerfilResponse {
    id: number = 0;
    idEncrypted: string = '';
    nome: string = '';
    sistema: string = '';
    perfilAcessos: AcessoResponse[] = [];
    checked = false;
}

export class PerfilRequest {
    nome: string = '';
    sistema_Id: number = 0;
    accessControllers_Id: number[] = []
}

export class PerfilUpdateRequest {
    nome: string = '';
    acessos: AcessoResponse[] = []
}

export class PerfilAccountResponse {
    id: number = 0;
    idEncrypted: string = '';
    perfil: string = '';
    perfil_Id: number = 0;
}

export class PerfilAccountUpdateRequest {
    id: number = 0;
    perfil_Id: number = 0;
    excluido?: boolean = false;
}