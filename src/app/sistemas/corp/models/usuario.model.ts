import { PerfilAccountResponse, PerfilAccountUpdateRequest } from "./perfil.model";

export class UsuarioFiltro {
    de: Date | string = '';
    ate: Date | string= '';
    dataCadastro: Date | string = '';
    nome?: string;
    email?: string;
    documento?: string;
    cadastradoPor_Nome?: string;
    cadastradoPor_Email?: string;
    status?: boolean;
    perfis: UsuarioFiltroPerfil[] = [];
}

export class UsuarioFiltroPerfil {
    id: number = 0;
    checked: boolean = false;
}


export class UsuarioResponse {
    id: number = 0;
    idEncrypted: string = '';
    documento: string = '';
    email: string = '';
    nome: string = '';
    created: Date = new Date;
    updated: Date = new Date;
    perfilAccounts: PerfilAccountResponse[] = [];
    perfil_Id: number[] = [];
    isVerified: boolean = true;
}

export class UsuarioRequest {
    nome: string = '';
    documento: string = '';
    password: string = '';
    confirmPassword: string = '';
    email: string = '';
    perfis: number[] = [];
}

export class UpdateUsuarioRequest {
    id: number = 0;
    idEncrypted: string = '';
    documento: string = '';
    email: string = '';
    nome: string = '';
    password: string = '';
    confirmPassword: string = '';
    perfis: PerfilAccountUpdateRequest[] = [];
}